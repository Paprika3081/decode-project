document.getElementById('upload').addEventListener('change', handleFile, false);
document.getElementById('decodeButton').addEventListener('click', function() {
    const encodedText = document.getElementById('encodedText').value;
    const decodedText = decodeWindows1251(encodedText);
    document.getElementById('encodedText').value = decodedText;
});

document.getElementById('copyButton').addEventListener('click', function() {
    const encodedText = document.getElementById('encodedText');
    encodedText.select();
    document.execCommand('copy');
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
