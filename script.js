document.getElementById('upload').addEventListener('change', handleFile, false);

document.getElementById('copyButton').addEventListener('click', function() {
    const encodedText = document.getElementById('encodedText');
    encodedText.select();
    document.execCommand('copy');
});

document.getElementById('downloadButton').addEventListener('click', () => {
    const textArea = document.getElementById('encodedText');
    const text = textArea.value;

    // Разделяем текст на строки и создаем массив массивов
    const rows = text.split('\n').map(line => [line]);

    // Создаем лист Excel из массива массивов
    const ws = XLSX.utils.aoa_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    // Создаем и скачиваем файл Excel
    XLSX.writeFile(wb, 'data.xlsx');
});

function handleFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        // Чтение файла как текст
        const text = e.target.result;
        document.getElementById('encodedText').value = text;
    };
    reader.readAsText(file);
}

function decodeWindows1251(encodedStr) {
    // Преобразование строки в Uint8Array
    const bytes = new Uint8Array(
        encodedStr.split('').map(char => char.charCodeAt(0))
    );
    try {
        const decoder = new TextDecoder('windows-1251');
        return decoder.decode(bytes);
    } catch (e) {
        console.error('Ошибка декодирования:', e);
        return 'Ошибка декодирования.';
    }
}
