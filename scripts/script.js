
let originDropDownChoicesDiv = document.querySelector('.origin-selection .drop-down-choices');
let originDropDownChoiceBtns = document.querySelectorAll('.origin-selection .drop-down-choices button');
let selectedOrigin = document.querySelector('.selected-origin');
let destinationDropDownChoicesDiv = document.querySelector('.destination-selection .drop-down-choices');
let destinationDropDownChoiceBtns = document.querySelectorAll('.destination-selection .drop-down-choices button');
let selectedDestination = document.querySelector('.selected-destination');
let originBtn = document.querySelector('.origin-btn');
let destinationBtn = document.querySelector('.destination-btn');
let getJourneyBtn = document.querySelector('.get-journey-btn');
let animationLineOne = document.querySelector('.animation-line-one');
let animationLineTwo = document.querySelector('.animation-line-two');
let animationLineThree = document.querySelector('.animation-line-three');

let trainLines = {
    alamein: ['Flinders Street', 'Richmond', 'East Richmond', 'Burnley', 'Hawthorn', 'Glenferrie'],
    glenWaverly: ['Flagstaff', 'Melbourne Central', 'Parliament', 'Richmond', 'Kooyong', 'Tooronga'],
    sandringham: ['Southern Cross', 'Richmond', 'South Yarra', 'Prahran', 'Windsor'],
    intersection: 'intersection'
}

let origin = {
    station: trainLines.glenWaverly[0],
    stationIndex: function(){
        return this.line.indexOf(this.station);
    },
    line: trainLines.glenWaverly,
    moves: 0
}

let destination = {
    station: trainLines.sandringham[3],
    stationIndex: function(){
        return this.line.indexOf(this.station)
    },
    line: trainLines.sandringham,
    moves: 0
}

let defaultTime = 500;

function stationsAwayFromRichmond(){
    if (origin.line == 'intersection'){
        return 0;
    }
    origin.moves = (origin.line.indexOf('Richmond') - origin.stationIndex())
    return origin.moves;
}

function stationsAwayFromDestination(){
    destination.moves = (destination.stationIndex() - destination.line.indexOf('Richmond'))
    return destination.moves;
}

function drawOnLineOne(text){
    let newStation = document.createElement('DIV');
    newStation.innerText = text;
    newStation.classList.add('station-obj');
    animationLineOne.append(newStation);
}

function drawOnLineTwo(){
    let newIntersection = document.createElement('DIV');
    newIntersection.innerText = 'Change Lines';
    newIntersection.classList.add('intersection-obj');
    animationLineTwo.append(newIntersection);
}

function drawOnLineThree(text){
    let newStation = document.createElement('DIV');
    newStation.innerText = text;
    newStation.classList.add('station-obj');
    animationLineThree.append(newStation);
}

function printJourney(){
        
    
    if(origin.line == 'intersection' || destination.line == 'intersection'){
        if (destination.line != 'intersection'){
            if (destination.stationIndex() > destination.line.indexOf('Richmond')){
                for (let i = destination.line.indexOf('Richmond'); i <= destination.stationIndex(); i++){
                    setTimeout(function(){
                        drawOnLineOne(destination.line[destination.line.indexOf('Richmond') - 1 + i]);  
                    }, (i + 1) * defaultTime)
                }
            } else{
                for (let i = destination.stationIndex(); i <= destination.line.indexOf('Richmond'); i++){
                    setTimeout(function(){
                        drawOnLineOne(destination.line[destination.line.indexOf('Richmond') - i]);  
                    }, (i + 1) * defaultTime)
                }
            }
        } else if(origin.line != 'intersection'){
            if (origin.stationIndex() < origin.line.indexOf('Richmond')){
                for (let i = origin.line.indexOf('Richmond'); i <= origin.stationIndex(); i++){
                    setTimeout(function(){
                        drawOnLineOne(origin.line[origin.line.indexOf('Richmond') - 1 + i]);  
                    }, (i + 1) * defaultTime)
                }
            } else{
                for (let i = origin.stationIndex(); i <= origin.line.indexOf('Richmond'); i++){
                    setTimeout(function(){
                        drawOnLineOne(origin.line[origin.line.indexOf('Richmond') - i]);  
                    }, (i + 1) * defaultTime)
                }
            }
        } else{
            setTimeout(function(){
                drawOnLineOne('Richmond');
            }, defaultTime)
        }
    }
    else if (origin.line != destination.line){
            stationsAwayFromRichmond();
            stationsAwayFromDestination();
            if (origin.moves > 0){
                for(let i = 0; i <= origin.moves; i++){
                    setTimeout(function(){
                        drawOnLineOne(origin.line[origin.stationIndex() + i]);
                    }, ((i + 1)*defaultTime));
                }
                setTimeout(function(){
                    drawOnLineTwo();
                    animationLineTwo.style.marginLeft = String(animationLineOne.offsetWidth - animationLineOne.lastChild.offsetWidth + 'px');
                }, (Math.abs(origin.moves) + 1) * defaultTime);

                if (destination.moves > 0){
                    for(let i = 0; i <= destination.moves; i++){
                        setTimeout(function(){
                            drawOnLineThree(destination.line[destination.stationIndex() - destination.moves + i]);
                            animationLineThree.style.marginLeft = String(animationLineOne.offsetWidth - animationLineOne.lastChild.offsetWidth + 'px');
                        }, (Math.abs(origin.moves) + i + 1) * defaultTime);
                    }
                } else {
                    for (let i = 0; i <= Math.abs(destination.moves); i++)
                        setTimeout(function(){
                            drawOnLineThree(destination.line[destination.stationIndex() + Math.abs(destination.moves) - i]);
                            animationLineThree.style.marginLeft = String(animationLineOne.offsetWidth - animationLineOne.lastChild.offsetWidth + 'px');
                        }, ((i + 2)*defaultTime));
                    }
                }
            else if (origin.moves < 0){
                for (let i = 0; i <= Math.abs(origin.moves); i++)
                    setTimeout(function(){
                    drawOnLineOne(origin.line[origin.stationIndex() - i]);
                    }, ((i + 1)*defaultTime));

                    setTimeout(function(){
                        drawOnLineTwo();
                        animationLineTwo.style.marginLeft = String(animationLineOne.offsetWidth - animationLineOne.lastChild.offsetWidth + 'px');
                    }, (Math.abs(origin.moves) + 1) * defaultTime);
    
                    if (destination.moves > 0){
                        for(let i = 0; i <= destination.moves; i++){
                            setTimeout(function(){
                                drawOnLineThree(destination.line[destination.stationIndex() - destination.moves + i]);
                                animationLineThree.style.marginLeft = String(animationLineOne.offsetWidth - animationLineOne.lastChild.offsetWidth + 'px');
                            }, (Math.abs(origin.moves) + i + 1) * defaultTime);
                        }
                    } else {
                        for (let i = 0; i <= Math.abs(destination.moves); i++)
                            setTimeout(function(){
                                drawOnLineThree(destination.line[destination.stationIndex() + Math.abs(destination.moves) - i]);
                                animationLineThree.style.marginLeft = String(animationLineOne.offsetWidth - animationLineOne.lastChild.offsetWidth + 'px');
                            }, (Math.abs(origin.moves) + i + 1) * defaultTime);
                     }
            }            
    } 
    else if (origin.line == destination.line){
            if(origin.stationIndex() < destination.stationIndex()){
                for(let i = 0; i <= destination.stationIndex() - origin.stationIndex(); i++){
                    setTimeout(function(){
                        drawOnLineOne(origin.line[origin.stationIndex() + i]);
                    }, (i+1) * defaultTime)
                    
                }
            }
            else if(origin.stationIndex() > destination.stationIndex()){
                for(let i = 0; i <= origin.stationIndex() - destination.stationIndex(); i++){
                    setTimeout(function(){
                        drawOnLineOne(origin.line[origin.stationIndex() - i]);
                    }, (i+1) * defaultTime)
                }
            }
            else{
                setTimeout(function(){
                    drawOnLineOne(origin.station);
            }, defaultTime)};
        }
    }
             
    

function removeAnim(){
    while(animationLineOne.hasChildNodes()){
        animationLineOne.removeChild(animationLineOne.lastChild);
    }
    while(animationLineTwo.hasChildNodes()){
        animationLineTwo.removeChild(animationLineTwo.lastChild);
    }
    while(animationLineThree.hasChildNodes()){
        animationLineThree.removeChild(animationLineThree.lastChild);
    }
    }



function handleGetJourney(){
    removeAnim();
    printJourney();
}

getJourneyBtn.addEventListener('click', function(){
    if (selectedOrigin.textContent != 'click me' && selectedDestination.textContent != 'click me'){
        getJourneyBtn.querySelector('.invalid-options-txt').classList.add('hide');
        handleGetJourney()
    } else {
        getJourneyBtn.querySelector('.invalid-options-txt').classList.remove('hide');
    }
});

for(let i = 0; i < originDropDownChoiceBtns.length; i++){
    originDropDownChoiceBtns[i].addEventListener('click', function(e){
        origin.station = e.currentTarget.value;
        origin.line = trainLines[e.currentTarget.dataset.line];
        selectedOrigin.innerText = e.currentTarget.innerText;
        originDropDownChoicesDiv.classList.toggle('hide')
    });
}

for(let i = 0; i < destinationDropDownChoiceBtns.length; i++){
    destinationDropDownChoiceBtns[i].addEventListener('click', function(e){
        destination.station = e.currentTarget.value;
        destination.line = trainLines[e.currentTarget.dataset.line];
        selectedDestination.innerText = e.currentTarget.innerText;
        destinationDropDownChoicesDiv.classList.toggle('hide')
    });
}

originBtn.addEventListener('click', function(){
    originDropDownChoicesDiv.classList.toggle('hide')
})

destinationBtn.addEventListener('click', function(){
    destinationDropDownChoicesDiv.classList.toggle('hide');
})