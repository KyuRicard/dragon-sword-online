function registre() {
    var pass1 = document.getElementById('pass1').value;
    var pass2 = document.getElementById('pass2').value;
    if (pass1 !== pass2) {
        alert("Les contrasenyes no coincideixen. Torna a escriure-les");      
        pass1.value = "";
        pass2.value = "";
    } else {
        
    }
}
