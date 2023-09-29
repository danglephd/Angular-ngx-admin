function randCircle(i, width, height, centerx, centery, value, zoom, cR) {
    let goldenRatio_phi = 0.618033988749895;
    let s = 0.5;
    let v = 0.99;
    let h = 0.99;
    let r = Math.sqrt(i);
    let theta = i * 2 * Math.PI / (goldenRatio_phi * goldenRatio_phi);

    let x = (Math.cos(theta) * r) * zoom;
    let y = (Math.sin(theta) * r) * zoom;
    let rX = Math.round((centerx) + x);
    let rY = Math.round((centery) + y);

    if (rX - cR < 0 || rY - cR < 0 || rX + cR > width || rY + cR > height) {
        return null;
    }

    let circleColor = this.hsv_to_rgb_By_Int(Math.random(), s, v);

    let c = {
        R: cR,
        rX: rX,
        rY: rY,
        value: value,
        backgroundColor: circleColor.backgroundColor,
        color: circleColor.color
    };
    return c;
}

function hsv_to_rgb_By_Int(h, s, v) {
    let r = 0, g = 0, b = 0, count = 0, randColor = 6;

    try {
        do {
            let h_i = Math.round(h * randColor);
            let f = (h * 6 - h_i);
            let p = v * (1 - s);
            let q = v * (1 - f * s);
            let t = v * (1 - (1 - f) * s);

            switch (h_i) {

                case 24:
                case 0:
                    r = v;
                    g = t;
                    b = p;
                    break;
                case 1:
                    r = q;
                    g = v;
                    b = p;
                    break;
                case 2:
                    r = p;
                    g = v;
                    b = t;
                    break;
                case 3:
                    r = p;
                    g = q;
                    b = v;
                    break;
                case 4:
                    r = t;
                    g = p;
                    b = v;
                    break;
                case 5:
                    r = v;
                    g = p;
                    b = q;
                    break;
                case 6:
                    r = p;
                    g = t;
                    b = v;
                    break;
                case 7:
                    r = v;
                    g = t;
                    b = q;
                    break;
                case 8:
                    r = v;
                    g = q;
                    b = t;
                    break;
                case 9:
                    r = t;
                    g = v;
                    b = q;
                    break;
                case 10:
                    r = t;
                    g = q;
                    b = v;
                    break;
                case 11:
                    r = q;
                    g = v;
                    b = t;
                    break;
                case 12:
                    r = q;
                    g = t;
                    b = v;
                    break;
                case 13:
                    r = v;
                    g = p;
                    b = t;
                    break;
                case 14:
                    r = v;
                    g = q;
                    b = p;
                    break;
                case 15:
                    r = p;
                    g = v;
                    b = q;
                    break;
                case 16:
                    r = t;
                    g = v;
                    b = p;
                    break;
                case 17:
                    r = q;
                    g = p;
                    b = t;
                    break;
                case 18:
                    r = q;
                    g = p;
                    b = v;
                    break;
                case 19:
                    r = t;
                    g = p;
                    b = q;
                    break;
                case 20:
                    r = t;
                    g = q;
                    b = p;
                    break;
                case 21:
                    r = p;
                    g = t;
                    b = q;
                    break;
                case 22:
                    r = p;
                    g = q;
                    b = t;
                    break;
                case 23:
                    r = q;
                    g = t;
                    b = p;
                    break;
            }

            if (r == 0 && g == 0 && b == 0) {
                console.log('>>>Count: ', h_i);
            }
        } while (r == 0 && g == 0 && b == 0 && count++ < 3)
    }
    catch (exx) {
        console.log('Error: ', exx);
        return `rgb(0, 0 , 0)`;
    }

    let floatV = (r * 256) + "";
    let red = floatV.includes(".") ? floatV.substring(0, floatV.indexOf(".")) : floatV;
    floatV = (g * 256) + "";
    let green = floatV.includes(".") ? floatV.substring(0, floatV.indexOf(".")) : floatV;
    floatV = (b * 256) + "";
    let blue = floatV.includes(".") ? floatV.substring(0, floatV.indexOf(".")) : floatV;

    red = red > 255 ? 255 : red;
    green = green > 255 ? 255 : green;
    blue = blue > 255 ? 255 : blue;
    return {
        backgroundColor: `rgb(${red}, ${green}, ${blue})`,
        // color: `rgb(${255 - red}, ${255 - green}, ${255 - blue})`,
        color: `rgb(0, 0, 0)`,
    };
}

function drawCircle(ctx, c) {
    ctx.beginPath();
    ctx.arc(c.rX, c.rY, c.R, 0, 2 * Math.PI, false);
    ctx.fillStyle = c.color;
    ctx.fill();
}

function initNumberArray(numbLength) {
    let numberArray = [];
    let j = 0, i = 0, temp;
    for (i = 0; i < numbLength; i++) {
        numberArray[i] = i + 1;
    }
    for (i = 0; i < numbLength; i++) {
        j = i + Math.floor(Math.random() * numbLength - i);
        temp = numberArray[i];
        numberArray[i] = numberArray[j];
        numberArray[j] = temp;
    }
    return numberArray;
}

function calculateFinalNumber(numbLength, width, height, centerx, centery, zoomBoard, cR) {
    let numberMax = 0;
    for (let j = 0, i = j + 1; j < numbLength || numberMax < numbLength; j++, i = j + 1) {
        let c = this.randCircle(i, width, height, centerx, centery, 0, zoomBoard, cR);

        if (c != null) {
            numberMax++;
        }
        if (j > numbLength * 1.5) {
            return numberMax;
        }
    }
    return numbLength;
}