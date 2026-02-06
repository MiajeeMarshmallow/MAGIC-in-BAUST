// Function to handle Report Type changes (Labels & Titles)
function handleTypeChange() {
    const type = document.getElementById('reportType').value;
    const outType = document.getElementById('outType');
    const labelNo = document.getElementById('labelNo');
    const labelDate1 = document.getElementById('labelDate1');

    outType.innerText = type;

    if (type === 'LAB REPORT') {
        labelNo.innerText = 'Lab no.';
        labelDate1.innerText = 'Date of Experiment';
    } else if (type === 'PROJECT REPORT') {
        labelNo.innerText = 'Project no.';
        labelDate1.innerText = 'Date of Commencement';
    } else {
        labelNo.innerText = 'Assignment no.';
        labelDate1.innerText = 'Date of Assignment';
    }
    update();
}

// Logo upload handler
document.getElementById('logoInput').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = () => document.getElementById('preview-logo').src = reader.result;
    reader.readAsDataURL(e.target.files[0]);
});

// Update preview fields in real-time
function update() {
    const map = {
        'inUni':'outUni', 
        'inDept':'outDept', 
        'inCName':'outCName', 
        'inCCode':'outCCode',
        'inANo':'outANo', 
        'inAName':'outAName', 
        'inDate1':'outDate1', 
        'inDate2':'outDate2',
        'inSN':'outSN', 
        'inSI':'outSI', 
        'inSD':'outSD', 
        'inTN':'outTN', 
        'inTDes':'outTDes', 
        'inTD':'outTD'
    };
    for(let id in map) {
        const el = document.getElementById(map[id]);
        const input = document.getElementById(id);
        if(el && input) el.innerText = input.value;
    }
}

// Initial update on page load
window.onload = update;

// PDF Download function
function downloadPDF() {
    const element = document.getElementById('cover-page');
    const opt = {
        margin: 0,
        filename: 'BAUST_Cover_Page.pdf',
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().from(element).set(opt).toPdf().get('pdf').then(function (pdf) {
        // Ensuring only the first page is kept
        if (pdf.internal.getNumberOfPages() > 1) {
            pdf.deletePage(2);
        }
    }).save();
}