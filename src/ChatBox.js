
import React from 'react';
import { Chat } from '@progress/kendo-react-conversational-ui';
import './ChatBox.css';
import {ApiAiClient} from 'api-ai-javascript';
import Axios from 'axios';


const accessToken='b97e5001f5d940f09a641a931bd73d84';
const client = new ApiAiClient({accessToken});

function MessageTemplate(props) {
    return (
        <div className="k-bubble">
            <div>{props.item.text}</div>
        </div>
    );
}

export default class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.user = {
            id: 1,
            name: this.props.firstName? this.props.firstName:'Guest',
            avatarUrl: `https://via.placeholder.com/300/008000/FFFFFF?text=${this.props.firstName? this.props.firstName[0]:'Guest'}`
        };
        this.bot = {
            id: 0,
            name: 'Dr.Robot',
            avatarUrl: `${require ('./medbot.png')}`
        };
        this.state = {
            messages: [],
            symptoms: [],
            phase: 1,
            suggesstions: [],
            waitingChoice: false,
            disease: ''
        };
        this.initialState = {
            symptoms: [],
            phase: 1,
            suggesstions: [],
            waitingChoice: false,
            disease: ''
        };
    }

    componentDidUpdate(){
        console.log('------------<><><>',this.state);
        if (this.state.phase === 3){
            this.botReply(`you might be infected with ${this.state.disease}`,1);
            this.botReply('I wish I was helpfull',2);
            this.setState(this.initialState);
        }
    }

    botReply = (msg, timer) => {
        let botResp = {
            author: this.bot,
            text: msg,
            timestamp: new Date(),
            }

        setTimeout(() => {
            this.setState((prevState) => {
                return { messages: [...prevState.messages, botResp] };
            });
            },1000 * timer);
    }

    addNewMessage = (event) => {
        
        this.setState((prevState) => {
            return { messages: [...prevState.messages, event.message] };
        });

        // openneing conversation phase and getting symptoms
        if (this.state.phase === 1){
            client.textRequest(event.message.text).then( (response) => {
                console.log(response);
                const {result: {fulfillment: {messages}, parameters}} = response;
                let message = '';
                
                
                for ( message in messages){
                    if(messages[message]['speech'] === "I understand")
                    {
                        this.setState((prevState) => {
                            return { symptoms: [...prevState.symptoms, ...parameters.symptoms] };
                        });

                        const rep = this.state.symptoms.length > 3 ? 'I understand': 'please, the entered symptoms are not engough or maybe I couldn\' understand what you said. please, tell me more';
                        this.botReply(rep, 0);

                        if (this.state.symptoms.length >= 3){
                            let body ='{ "symptoms" :"';
                            let symptom = '';
                            for (symptom in this.state.symptoms){
                                if (symptom > 0){
                                    body = body + ","
                                }
                                body = body + this.state.symptoms[symptom] ;
                            }
                            body = body + '"}';
                            Axios.post('/getSymptoms',body, {headers: {'Access-Control-Allow-Origin': '*','Content-Type':'application/json'
                            }}).then((response) => {
                                this.setState((prevState) =>{
                                    return {suggesstions: [...prevState.suggesstions, ...response.data.Symptoms]}
                                })
                            }, (error) => alert(new Error('can\'t connect to the server')));
                            this.setState({phase: 2});
                        }
                    }
                    else{
                        
                        this.botReply(messages[message]['speech'], message);
                        }
                }
                
                
            }).catch((Error) => {
                console.log(Error);
                alert('server connection failure');
            });
        }

        if(this.state.phase === 2 && this.state.waitingChoice === true){
            if(event.message.text !== "none of them"){
            this.setState((prevState) => {
                return{symptoms: [...prevState.symptoms, event.message.text], waitingChoice: false}
            });
        }else {
            this.setState(() => {
                return{waitingChoice: false}
            });
            }
        }


        // suggesting more symptoms on the user to choose
        if (this.state.phase === 2 && this.state.suggesstions.length > 1){
            let sy1 =this.state.suggesstions.pop();
            let sy2 =this.state.suggesstions.pop();
            let msg = `which symptom do you suffer?`
            let botResp = {
                author: this.bot,
                text: msg,
                timestamp: new Date(),
                suggestedActions: [{
                    value: sy1,
                    type: 'reply'
                },{
                    value: sy2,
                    type: 'reply'
                },{
                    value: 'none of them',
                    type: 'reply'
                }]
            }

            setTimeout(() => {
                this.setState((prevState) => {
                    return { messages: [...prevState.messages, botResp], waitingChoice:true };
                });
                },1000);
            
            setTimeout(() => {
                document.addEventListener('keypress', (event) => {
                    if(this.state.phase===2){event.preventDefault();
                    alert('you have to make a choice');}
                });
            },1000);
        }else if(this.state.phase === 2 && this.state.suggesstions.length <= 1){
            let body ='{ "symptoms" :"';
            let symptom = '';
            for (symptom in this.state.symptoms){
                if (symptom > 0){
                    body = body + ","
                }
                body = body + this.state.symptoms[symptom] ;
            }
            body = body + '"}';
            Axios.post("/getDisease", body, {headers: {'Access-Control-Allow-Origin': '*','Content-Type':'application/json'
        }}).then((response) => {
            this.setState(() => {
                return { disease: response.data.Disease, phase: 3 };
            });
        }, (error) => alert(new Error('can\'t connect to the server')));
            
        }



        
    };

    render() {
        return (
            <div>
                <Chat user={this.user}
                    messages={this.state.messages}
                    onMessageSend={this.addNewMessage}
                    width={700}
                    messageTemplate={MessageTemplate}>
                </Chat>
            </div>
        );
    }
}


