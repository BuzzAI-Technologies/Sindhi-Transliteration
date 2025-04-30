document.addEventListener('DOMContentLoaded', function() {
    const inputScript = document.getElementById('inputScript');
    const inputText = document.getElementById('inputText');
    const transliterateBtn = document.getElementById('transliterateBtn');
    const devanagariOutput = document.getElementById('devanagariOutput');
    const arabicOutput = document.getElementById('arabicOutput');
    const romanOutput = document.getElementById('romanOutput');

    // Mapping tables
    const mappings = {
        // Devanagari to Arabic and Roman
        devanagari: {
            'अ': { arabic: 'ا', roman: 'a' },
            'आ': { arabic: 'آ', roman: 'aa' },
            'इ': { arabic: 'ِ', roman: 'i' },
            'ई': { arabic: 'ٖي', roman: 'ee' },
            'उ': { arabic: 'ُ', roman: 'u' },
            'ऊ': { arabic: 'ٗو', roman: 'oo' },
            'ए': { arabic: 'ې', roman: 'e' },
            'ऐ': { arabic: 'َے', roman: 'ai' },
            'ओ': { arabic: 'و', roman: 'o' },
            'औ': { arabic: 'َو', roman: 'au' },
            
            'क': { arabic: 'ڪ', roman: 'k' },
            'ख': { arabic: 'کھ', roman: 'kh' },
            'ग': { arabic: 'گ', roman: 'g' },
            'घ': { arabic: 'گھ', roman: 'gh' },
            'ङ': { arabic: 'ڱ', roman: 'ng' },
            
            'च': { arabic: 'چ', roman: 'ch' },
            'छ': { arabic: 'ڇ', roman: 'chh' },
            'ज': { arabic: 'ج', roman: 'j' },
            'झ': { arabic: 'جھ', roman: 'jh' },
            'ञ': { arabic: 'ڃ', roman: 'ny' },
            
            'ट': { arabic: 'ٽ', roman: 'tt' },
            'ठ': { arabic: 'ٺ', roman: 'tth' },
            'ड': { arabic: 'ڊ', roman: 'dd' },
            'ढ': { arabic: 'ڍ', roman: 'ddh' },
            'ण': { arabic: 'ڻ', roman: 'nn' },
            
            'त': { arabic: 'ت', roman: 't' },
            'थ': { arabic: 'ٿ', roman: 'th' },
            'द': { arabic: 'د', roman: 'd' },
            'ध': { arabic: 'ڌ', roman: 'dh' },
            'न': { arabic: 'ن', roman: 'n' },
            
            'प': { arabic: 'پ', roman: 'p' },
            'फ': { arabic: 'ف', roman: 'ph' },
            'ब': { arabic: 'ب', roman: 'b' },
            'भ': { arabic: 'ڀ', roman: 'bh' },
            'म': { arabic: 'م', roman: 'm' },
            
            'य': { arabic: 'ي', roman: 'y' },
            'र': { arabic: 'ر', roman: 'r' },
            'ल': { arabic: 'ل', roman: 'l' },
            'व': { arabic: 'و', roman: 'v' },
            
            'श': { arabic: 'ش', roman: 'sh' },
            'ष': { arabic: 'ڙ', roman: 'shh' },
            'स': { arabic: 'س', roman: 's' },
            'ह': { arabic: 'ه', roman: 'h' },
            
            'ड़': { arabic: 'ڙ', roman: 'rr' },
            'ढ़': { arabic: 'ڙه', roman: 'rrh' },
            
            '्': { arabic: '', roman: '' }, // Virama
            'ा': { arabic: 'ا', roman: 'a' },
            'ि': { arabic: 'ِ', roman: 'i' },
            'ी': { arabic: 'ي', roman: 'ee' },
            'ु': { arabic: 'ُ', roman: 'u' },
            'ू': { arabic: 'و', roman: 'oo' },
            'े': { arabic: 'ي', roman: 'e' },
            'ै': { arabic: 'َے', roman: 'ai' },
            'ो': { arabic: 'و', roman: 'o' },
            'ौ': { arabic: 'َو', roman: 'au' },
            'ं': { arabic: 'ً', roman: 'n' }, // Anusvara
            'ः': { arabic: 'ه', roman: 'h' }, // Visarga
            '़': { arabic: '', roman: '' }, // Nukta
        },
        
        // Arabic to Devanagari and Roman (reverse mapping)
        arabic: {
            'ا': { devanagari: 'अ', roman: 'a' },
            'آ': { devanagari: 'आ', roman: 'aa' },
            'ِ': { devanagari: 'इ', roman: 'i' },
            'ٖي': { devanagari: 'ई', roman: 'ee' },
            'ُ': { devanagari: 'उ', roman: 'u' },
            'ٗو': { devanagari: 'ऊ', roman: 'oo' },
            'ې': { devanagari: 'ए', roman: 'e' },
            'َے': { devanagari: 'ऐ', roman: 'ai' },
            'و': { devanagari: 'ओ', roman: 'o' },
            'َو': { devanagari: 'औ', roman: 'au' },
            
            'ڪ': { devanagari: 'क', roman: 'k' },
            'کھ': { devanagari: 'ख', roman: 'kh' },
            'گ': { devanagari: 'ग', roman: 'g' },
            'گھ': { devanagari: 'घ', roman: 'gh' },
            'ڱ': { devanagari: 'ङ', roman: 'ng' },
            
            'چ': { devanagari: 'च', roman: 'ch' },
            'ڇ': { devanagari: 'छ', roman: 'chh' },
            'ج': { devanagari: 'ज', roman: 'j' },
            'جھ': { devanagari: 'झ', roman: 'jh' },
            'ڃ': { devanagari: 'ञ', roman: 'ny' },
            
            'ٽ': { devanagari: 'ट', roman: 'tt' },
            'ٺ': { devanagari: 'ठ', roman: 'tth' },
            'ڊ': { devanagari: 'ड', roman: 'dd' },
            'ڍ': { devanagari: 'ढ', roman: 'ddh' },
            'ڻ': { devanagari: 'ण', roman: 'nn' },
            
            'ت': { devanagari: 'त', roman: 't' },
            'ٿ': { devanagari: 'थ', roman: 'th' },
            'د': { devanagari: 'द', roman: 'd' },
            'ڌ': { devanagari: 'ध', roman: 'dh' },
            'ن': { devanagari: 'न', roman: 'n' },
            
            'پ': { devanagari: 'प', roman: 'p' },
            'ف': { devanagari: 'फ', roman: 'ph' },
            'ب': { devanagari: 'ब', roman: 'b' },
            'ڀ': { devanagari: 'भ', roman: 'bh' },
            'م': { devanagari: 'म', roman: 'm' },
            
            'ي': { devanagari: 'य', roman: 'y' },
            'ر': { devanagari: 'र', roman: 'r' },
            'ل': { devanagari: 'ल', roman: 'l' },
            'و': { devanagari: 'व', roman: 'v' },
            
            'ش': { devanagari: 'श', roman: 'sh' },
            'ڙ': { devanagari: 'ष', roman: 'shh' },
            'س': { devanagari: 'स', roman: 's' },
            'ه': { devanagari: 'ह', roman: 'h' },
            
            'ڙ': { devanagari: 'ड़', roman: 'rr' },
            'ڙه': { devanagari: 'ढ़', roman: 'rrh' },
            
            'ً': { devanagari: 'ं', roman: 'n' }, // Anusvara
            'ه': { devanagari: 'ः', roman: 'h' }, // Visarga
        },
        
        // Roman to Devanagari and Arabic
        roman: {
            'a': { devanagari: 'अ', arabic: 'ا' },
            'aa': { devanagari: 'आ', arabic: 'آ' },
            'i': { devanagari: 'इ', arabic: 'ِ' },
            'ee': { devanagari: 'ई', arabic: 'ٖي' },
            'u': { devanagari: 'उ', arabic: 'ُ' },
            'oo': { devanagari: 'ऊ', arabic: 'ٗو' },
            'e': { devanagari: 'ए', arabic: 'ې' },
            'ai': { devanagari: 'ऐ', arabic: 'َے' },
            'o': { devanagari: 'ओ', arabic: 'و' },
            'au': { devanagari: 'औ', arabic: 'َو' },
            
            'k': { devanagari: 'क', arabic: 'ڪ' },
            'kh': { devanagari: 'ख', arabic: 'کھ' },
            'g': { devanagari: 'ग', arabic: 'گ' },
            'gh': { devanagari: 'घ', arabic: 'گھ' },
            'ng': { devanagari: 'ङ', arabic: 'ڱ' },
            
            'ch': { devanagari: 'च', arabic: 'چ' },
            'chh': { devanagari: 'छ', arabic: 'ڇ' },
            'j': { devanagari: 'ज', arabic: 'ج' },
            'jh': { devanagari: 'झ', arabic: 'جھ' },
            'ny': { devanagari: 'ञ', arabic: 'ڃ' },
            
            'tt': { devanagari: 'ट', arabic: 'ٽ' },
            'tth': { devanagari: 'ठ', arabic: 'ٺ' },
            'dd': { devanagari: 'ड', arabic: 'ڊ' },
            'ddh': { devanagari: 'ढ', arabic: 'ڍ' },
            'nn': { devanagari: 'ण', arabic: 'ڻ' },
            
            't': { devanagari: 'त', arabic: 'ت' },
            'th': { devanagari: 'थ', arabic: 'ٿ' },
            'd': { devanagari: 'द', arabic: 'د' },
            'dh': { devanagari: 'ध', arabic: 'ڌ' },
            'n': { devanagari: 'न', arabic: 'ن' },
            
            'p': { devanagari: 'प', arabic: 'پ' },
            'ph': { devanagari: 'फ', arabic: 'ف' },
            'b': { devanagari: 'ब', arabic: 'ب' },
            'bh': { devanagari: 'भ', arabic: 'ڀ' },
            'm': { devanagari: 'म', arabic: 'م' },
            
            'y': { devanagari: 'य', arabic: 'ي' },
            'r': { devanagari: 'र', arabic: 'ر' },
            'l': { devanagari: 'ल', arabic: 'ل' },
            'v': { devanagari: 'व', arabic: 'و' },
            
            'sh': { devanagari: 'श', arabic: 'ش' },
            'shh': { devanagari: 'ष', arabic: 'ڙ' },
            's': { devanagari: 'स', arabic: 'س' },
            'h': { devanagari: 'ह', arabic: 'ه' },
            
            'rr': { devanagari: 'ड़', arabic: 'ڙ' },
            'rrh': { devanagari: 'ढ़', arabic: 'ڙه' },
        }
    };

    // Function to transliterate text
    function transliterate() {
        const inputType = inputScript.value;
        const text = inputText.value;
        
        if (!text) {
            devanagariOutput.textContent = '';
            arabicOutput.textContent = '';
            romanOutput.textContent = '';
            return;
        }
        
        if (inputType === 'devanagari') {
            // Devanagari to Arabic and Roman
            let arabicText = '';
            let romanText = '';
            
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                if (mappings.devanagari[char]) {
                    arabicText += mappings.devanagari[char].arabic;
                    romanText += mappings.devanagari[char].roman;
                } else {
                    arabicText += char;
                    romanText += char;
                }
            }
            
            devanagariOutput.textContent = text;
            arabicOutput.textContent = arabicText;
            romanOutput.textContent = romanText;
            
        } else if (inputType === 'arabic') {
            // Arabic to Devanagari and Roman
            let devanagariText = '';
            let romanText = '';
            
            // We need to handle some Arabic characters that might be combined
            for (let i = 0; i < text.length; i++) {
                let found = false;
                
                // Check for multi-character sequences first
                if (i + 1 < text.length) {
                    const twoChars = text.substr(i, 2);
                    if (mappings.arabic[twoChars]) {
                        devanagariText += mappings.arabic[twoChars].devanagari;
                        romanText += mappings.arabic[twoChars].roman;
                        i++; // Skip next character
                        found = true;
                    }
                }
                
                if (!found && mappings.arabic[text[i]]) {
                    devanagariText += mappings.arabic[text[i]].devanagari;
                    romanText += mappings.arabic[text[i]].roman;
                } else if (!found) {
                    devanagariText += text[i];
                    romanText += text[i];
                }
            }
            
            devanagariOutput.textContent = devanagariText;
            arabicOutput.textContent = text;
            romanOutput.textContent = romanText;
            
        } else if (inputType === 'roman') {
            // Roman to Devanagari and Arabic
            let devanagariText = '';
            let arabicText = '';
            let i = 0;
            
            while (i < text.length) {
                let found = false;
                
                // Check for multi-character sequences first (up to 3 chars)
                for (let len = 3; len >= 1; len--) {
                    if (i + len <= text.length) {
                        const seq = text.substr(i, len).toLowerCase();
                        if (mappings.roman[seq]) {
                            devanagariText += mappings.roman[seq].devanagari;
                            arabicText += mappings.roman[seq].arabic;
                            i += len;
                            found = true;
                            break;
                        }
                    }
                }
                
                if (!found) {
                    devanagariText += text[i];
                    arabicText += text[i];
                    i++;
                }
            }
            
            devanagariOutput.textContent = devanagariText;
            arabicOutput.textContent = arabicText;
            romanOutput.textContent = text;
        }
    }

    // Event listeners
    transliterateBtn.addEventListener('click', transliterate);
    
    // Also transliterate when input changes
    inputText.addEventListener('input', transliterate);
    inputScript.addEventListener('change', transliterate);
});