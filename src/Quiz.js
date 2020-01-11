import React,{ Component } from 'react';
import QuizOptions from './QuizOptions';
import classNames from 'classnames';

class Quiz extends Component{
    constructor(props){
        super(props);
    
        let riddle = this.playGame();
        let gameOver = false;
        let correct = false;

        this.state = {riddle,correct,gameOver};
        this.renderOptions= this.renderOptions.bind(this);
        this.checkResults= this.checkResults.bind(this);
        this.play=this.play.bind(this);
      }

      randomGen(min,max)
      {
            return Math.floor(Math.random()*(max-min+1))+1;
      }

      genRandomOptions(sum){
        let resultArray= [];
        let randomArray = [];

        while(randomArray.length<=3)
        {
            let num=this.randomGen(1,19);
            if(randomArray.indexOf(num)>-1) continue;
            randomArray.push(num);
        }
        for(let i=0;i<3;i++)
        {
            let result = sum;
            let flag= this.randomGen(0,1);
            if(flag===1)
            {
                result+=randomArray[i];
            }
            else{
                result-=randomArray[i];
            }
            resultArray.push(result);
        }
        resultArray.push(sum);
        return resultArray;
      }

    playGame(){
          let field1=this.randomGen(20,50);
          let field2=this.randomGen(20,50);
          let result= field1+field2;
          let resArray = this.genRandomOptions(result);
          resArray.sort(function(a,b){ return 0.5 - Math.random()})
          let riddle={
            resArray : resArray,
            field1 : field1, 
            field2 : field2,
            ans : result,
          }
          if(this.state && this.state.gameOver)
          {
              this.setState({
                  riddle : riddle
              });
          }
          else
          {
            return riddle;
          }
      }

      checkResults(option){
        //   console.log('check result called'+option);
          if(this.state.riddle.ans === option)
          {
              console.log('correct answer');
              this.setState({
                  correct : true,
                  gameOver : true,
              });
          }
          else
          {
              console.log('wrong answer');
              this.setState({
                correct : false,
                gameOver : true,
            });
          }
      }

      renderOptions(){
          return(
            <div className="options">
                {this.state.riddle.resArray.map((option,i)=>
                    <QuizOptions val={option} key={i} checkResults = {()=>this.checkResults(option)}/>
                )}
            </div>
          )
      }

    renderMsg(){
        if(this.state.correct)
        {
            return <h3>Good Job!! Hit the button below to play again</h3>
        }
        else
        {
            return <h3>Ooops wrong answer!! Hit the button below to play again</h3>
        }
    }
    play(){
        this.setState({
            correct : false,
            gameOver : false,
        });
        this.playGame();
    }
    render(){
        return(
            <div className="quiz">
                <div className="quiz-content">
                    <p className="question">
                        What is the sum of <span className="text-info">{this.state.riddle.field1}</span> & <span className="text-info">{this.state.riddle.field2}</span>?
                    </p>
                    {this.renderOptions()}
                </div>
                Correct : {this.state.correct ? "True" : "False"}  <br/>
                Game Over : {this.state.gameOver ? "True" : "False" }
                <div className={classNames('after' , {'hide': !this.state.gameOver},{' wrong animated shake': !this.state.correct}, {'correct animated swing' : this.state.correct},)}>
                    {this.renderMsg()}
                </div>
                <div className="play-again">
                        <button className="button" onClick={this.play}>
                            Play again
                        </button>
                </div>
            </div>
        );
    }
}

export default Quiz;