
function fillDemoData(questions){
    const noOfQuestions=Number(prompt("How many question you want to enter in Quiz:"))
    for(let i=1;i<=noOfQuestions;i++){
        const question ={
            ques:null,
            anwers:[
            {
             text:null,correct:false
            },
            {
             text:null,correct:false  
            },
            {
             text:null,correct:false
            },
            {
             text:null,correct:false
            }]
        }
         question.ques=prompt(`Enter ${i} -> question`)
         if(question.ques===null||question.ques==""){
            break;
         }
         let j=1;
         for (const iterator of question.anwers) {
             iterator.text=prompt(`Question${i}->Enter the ${j} answer `)
             if(iterator.text===null||iterator.text==""){
                 break;
              }
             j++;
         }
         const TrueAns= Number(prompt(`which option is true for ${i} Question:`))
         switch (TrueAns) {
            case 1:
                question.anwers[0].correct=true
                break;
            case 2:
                question.anwers[1].correct=true
                break;
            case 3:
                question.anwers[2].correct=true
                break;
            case 4:
                question.anwers[3].correct=true
                break;
            default:
                break;
         }
         
        questions.push(question)
    }
    
      
}
let questions = [];
fillDemoData(questions);

const questionElement = document.getElementById("question")
const answerButton = document.getElementById("ans-button")
const nextButton = document.getElementById("next-btn")


let currentQuestionIndex;
let score;
function startQuiz(){
    currentQuestionIndex =0;
    score=0;
    showQuestion();
}


function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo =currentQuestionIndex+1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.ques

    currentQuestion.anwers.forEach( ans => {
        const button = document.createElement("button")
        button.innerHTML =ans.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(ans.correct){
            button.dataset.correct =ans.correct;
        }
        button.addEventListener("click",selectAnswer)
       
    });
    
    
    
}
function resetState()
{
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}
function selectAnswer(event){
    console.log(event);
    const selectedBtn = event.target;
    const iscorrect = selectedBtn.dataset.correct=="true"

    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
        
    }
    else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach((button)=>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct")
        }
        button.disabled = true;
    })
    nextButton.style.display="block";
    nextButton.innerHTML="Next"
    
    
   
    
}
function showScore(){
    resetState();
    questionElement.innerHTML=`your Score is ${score} out of ${questions.length}`
    nextButton.innerHTML="Play Again"
    nextButton.style.display="block"
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else
    {
        showScore();

    }
}
nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();




