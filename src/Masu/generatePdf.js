import jsPDF from 'jspdf';

export default function generatePdf(masu) {
    var orientation = masu.pageFormat === 'A4-p' ? 'p' : 'l';
    const pdf = new jsPDF(orientation, 'mm', 'A4');

    const l = parseFloat(masu.length);
    const w = parseFloat(masu.width);
    const h = parseFloat(masu.height);

    const max = l + 0.0 + w + 4.0 * h;

    const l_2 = l / 2.0;
    const w_2 = w / 2.0;
    const max_2 = max / 2.0;

    const h2 = h * 2.0;

    const translation = "1 0 0 1 " + (masu.pageWidth / 2.0) + " " + (masu.pageLength / 2.0);
    const cos = Math.cos(45 * Math.PI / 180);
    const sin = Math.sin(45 * Math.PI / 180);

    // Recto
    pdf.advancedAPI(pdf => {
        pdf.setCurrentTransformationMatrix(translation);
        pdf.setCurrentTransformationMatrix(`${cos} ${sin} ${-sin} ${cos} 0 0`);
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
    });

    // Verso
    pdf.addPage(orientation, 'mm', 'A4');
    pdf.advancedAPI(pdf => {
        pdf.setCurrentTransformationMatrix(translation);
        pdf.setCurrentTransformationMatrix(`${cos} ${-sin} ${sin} ${cos} 0 0`);

        // Background
        if (masu.box.background !== undefined) {
            pdf.setFillColor(masu.box.background);
            pdf.lines([[max_2 + 5, max_2 + 5], [-max_2 - 5, max_2 + 5], [-max_2 - 5, -max_2 - 5], [max_2 + 5, -max_2 - 5]], 0, -max_2 - 5, [1, 1], 'F');
        }

        // Text
        if (masu.box.frontText !== undefined) {
            pdf.setFontSize(8 * 72 / 25.4);
            pdf.text(masu.box.frontText, 0, l_2 + h / 2, { align: 'center', baseline: 'middle' });
        }
    });

    pdf.save('test.pdf');
}
