const elements = document.querySelectorAll('.choice');
const config = document.querySelector('.config');

let numElements = 3;

// Load different game configurations
const loadChoices = function (e) {

    switch(e){
        case 3:
            console.log("happened");
            elements.innerHTML = `
                <i id="rock" class="choice fas fa-hand-rock fa-10x"></i>
                <i id="paper" class="choice fas fa-hand-paper fa-10x"></i>
                <i id="scissors" class="choice fas fa-hand-scissors fa-10x"></i>
            `;
            break;
        case 5:
            elements.innerHTML = `
                <i id="rock" class="choice fas fa-hand-rock fa-10x"></i>
                <i id="paper" class="choice fas fa-hand-paper fa-10x"></i>
                <i id="scissors" class="choice fas fa-hand-scissors fa-10x"></i>
                <i class="fas fa-hand-lizard fa-10x"></i>
                <i class="fas fa-hand-spock fa-10x"></i>
            `;
            break;
        default:
            elements.innerHTML = `
                <i id="rock" class="choice fas fa-hand-rock fa-10x"></i>
            `;

    }
};

config.addEventListener('change', (event) => {
    loadChoices(event);
});