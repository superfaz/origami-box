export function getRotationMatrix(angle)
{
    const radian = angle * Math.PI / 180;
    const cos = Math.cos(radian).toFixed(5);
    const sin = Math.sin(radian).toFixed(5);
    return `${cos} ${sin} ${-sin} ${cos} 0 0`;
}

export function configureFace(configuration, face, l_2, w_2, h_2) {
    switch (face) {
        case 'front':
            configuration.x = 0;
            configuration.y = l_2 + h_2;
            configuration.rotate = 180;
            break;
        case 'back':
            configuration.x = 0;
            configuration.y = -l_2 - h_2;
            configuration.rotate = 0;
            break;
        case 'left':
            configuration.x = w_2 + h_2;
            configuration.y = 0;
            configuration.rotate = 90;
            break;
        case 'right':
            configuration.x = -w_2 - h_2;
            configuration.y = 0;
            configuration.rotate = -90;
            break;
        default:
            console.log('text.face not supported');
    }
}
