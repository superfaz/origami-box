import jsPDF from 'jspdf';
import { configureFace, getRotationMatrix } from './helper';

export default function generatePdf(masu) {
    var orientation = masu.pageFormat === 'A4-p' ? 'p' : 'l';
    const pdf = new jsPDF(orientation, 'mm', 'A4');

    const l = parseFloat(masu.length);
    const w = parseFloat(masu.width);
    const h = parseFloat(masu.height);

    const max = l + 0.0 + w + 4.0 * h;

    const l_2 = l / 2.0;
    const w_2 = w / 2.0;
    const h_2 = h / 2.0;
    const max_2 = max / 2.0;

    const h2 = h * 2.0;
    const mark = 2.5;

    const translation = "1 0 0 1 " + (masu.pageWidth / 2.0) + " " + (masu.pageLength / 2.0);

    // Recto
    pdf.advancedAPI(pdf => {
        pdf.setCurrentTransformationMatrix(translation);
        pdf.setCurrentTransformationMatrix(getRotationMatrix(45));
        pdf.setDrawColor('#000000');

        // Cut
        pdf.setLineWidth(0.2);
        pdf.lines([[max_2, max_2], [-max_2, max_2], [-max_2, -max_2], [max_2, -max_2]], 0, -max_2)
            .stroke();

        // Flip
        pdf.setLineDashPattern([4, 2]);
        pdf.line(-w_2 - h, -l_2 - h, w_2 + h, -l_2 - h);
        pdf.line(-w_2 - h2, -l_2, w_2 + h2, -l_2);
        pdf.line(-w_2 - h2, l_2, w_2 + h2, l_2);
        pdf.line(-w_2 - h, l_2 + h, w_2 + h, l_2 + h);
        pdf.line(-w_2 - h, -l_2 - h, -w_2 - h, l_2 + h);
        pdf.line(-w_2, -l_2 - h2, -w_2, l_2 + h2);
        pdf.line(w_2, -l_2 - h2, w_2, l_2 + h2);
        pdf.line(w_2 + h, -l_2 - h, w_2 + h, l_2 + h);

        // Inverted
        pdf.setLineDashPattern([2, 4]);
        pdf.line(-w_2, -l_2 - h2, w_2, -l_2 - h2);
        pdf.line(-w_2, l_2 + h2, w_2, l_2 + h2);
        pdf.line(-w_2 - h2, -l_2, -w_2 - h2, l_2);
        pdf.line(w_2 + h2, -l_2, w_2 + h2, l_2);
        pdf.line(-w_2 - h, -l_2 - h, -w_2, -l_2);
        pdf.line(w_2 + h, -l_2 - h, w_2, -l_2);
        pdf.line(-w_2 - h, l_2 + h, -w_2, l_2);
        pdf.line(w_2 + h, l_2 + h, w_2, l_2);

        // Mark
        pdf.setDrawColor('#0000FF');
        pdf.line(0, l_2 - h2 - w_2, -mark, l_2 - h2 - w_2 + mark);
        pdf.line(0, l_2 - h2 - w_2, mark, l_2 - h2 - w_2 + mark);
        pdf.line(0, l_2 - w_2, -mark, l_2 - w_2 + mark);
        pdf.line(0, l_2 - w_2, mark, l_2 - w_2 + mark);
        pdf.line(0, -l_2 + h2 + w_2, -mark, -l_2 + h2 + w_2 - mark);
        pdf.line(0, -l_2 + h2 + w_2, mark, -l_2 + h2 + w_2 - mark);
        pdf.line(0, -l_2 + w_2, -mark, -l_2 + w_2 - mark);
        pdf.line(0, -l_2 + w_2, mark, -l_2 + w_2 - mark);

        pdf.line(w_2 - h2 - l_2, 0, w_2 - h2 - l_2 + mark, -mark);
        pdf.line(w_2 - h2 - l_2, 0, w_2 - h2 - l_2 + mark, mark);
        pdf.line(w_2 - l_2, 0, w_2 - l_2 + mark, -mark);
        pdf.line(w_2 - l_2, 0, w_2 - l_2 + mark, mark);
        pdf.line(-w_2 + h2 + l_2, 0, -w_2 + h2 + l_2 - mark, -mark);
        pdf.line(-w_2 + h2 + l_2, 0, -w_2 + h2 + l_2 - mark, mark);
        pdf.line(-w_2 + l_2, 0, -w_2 + l_2 - mark, -mark);
        pdf.line(-w_2 + l_2, 0, -w_2 + l_2 - mark, mark);
        pdf.setDrawColor('#000000');
    });

    // Verso
    if (masu.withBackDesign) {
        pdf.addPage(orientation, 'mm', 'A4');
        pdf.advancedAPI(pdf => {
            pdf.setCurrentTransformationMatrix(translation);
            pdf.setCurrentTransformationMatrix(getRotationMatrix(-45));

            // Background
            if (masu.box.background !== undefined) {
                pdf.setFillColor(masu.box.background);
                pdf.lines([[max_2 + 5, max_2 + 5], [-max_2 - 5, max_2 + 5], [-max_2 - 5, -max_2 - 5], [max_2 + 5, -max_2 - 5]], 0, -max_2 - 5, [1, 1], 'F');
            }

            // Texts
            for (let index = 0; index < masu.box.texts.length; index++) {
                const text = masu.box.texts[index];
                let configuration = {};
                configureFace(configuration, text.face, l_2, w_2, h_2);
                pdf.setFontSize(8 * 72 / 25.4);

                pdf.setCurrentTransformationMatrix(`1 0 0 1 ${configuration.x} ${configuration.y}`);
                pdf.setCurrentTransformationMatrix(getRotationMatrix(configuration.rotate));
                pdf.text(text.content, -pdf.getTextWidth(text.content) / 2.0, 0, { baseline: 'middle' });
                pdf.setCurrentTransformationMatrix(getRotationMatrix(-configuration.rotate));
                pdf.setCurrentTransformationMatrix(`1 0 0 1 ${-configuration.x} ${-configuration.y}`);
            }
        });
    }

    pdf.save('test.pdf');
}
