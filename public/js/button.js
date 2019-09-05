function stoppedTyping(){
    if(this.value.length > 0) {
        document.getElementById('continueBtn').disabled = false;
    } else {
        document.getElementById('continueBtn').disabled = true;
    }
}
