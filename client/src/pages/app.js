import { useEffect, useState } from 'react';
import Form from './Form';
import { Logout, MoreVert, Search, Chat, PersonAdd, Person } from "@mui/icons-material"
import Contact from '../components/Contact';
import AddContact from './AddContact';
import CurrentChat from '../components/CurrentChat';
import io from "socket.io-client"
import { useNavigate } from 'react-router';
let socket;



export default function Home() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]); //Array for messages fetched from api
  const [contacts, setContacts] = useState([]);  //Array of contacts of the user which are rendered on left side of the screen
  const [currentChatData, setCurrentChatData] = useState({}); // object for the data of current chat
  const [addContact, setaddContact] = useState(false);    //Boolean state variable for show and hide functionality of add new contact box
  const [user, setUser] = useState({});  // email of the current user
  const [isUser, setIsUser] = useState(false);
  const [rightStyle, setRightStyle] = useState({});
  const [leftStyle, setLeftStyle] = useState({});
 








  async function appPage() {

    const result = await fetch("/app", {  
    method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: 'include'
    });
    const data = await result.json();
    if (result.status == 200) {
      navigate('/app');
      return true;
    } else if (result.status == 404) {
      navigate("/");
      return false;
    }
    return false;


  }
  useEffect(() => {

    appPage().then((value) => {
      if(isUser==false){
      setIsUser(value)
      }
    })
    if (isUser == true) {
      fetch('/messageServer', {
  
      credentials: 'include'
      }).then((a) => { //fetching messages of the user
        return a.json();
      })
        .then((parsed) => {
          setMessages(parsed);
        })

      fetch('/contactApi', {
  
      credentials: "include"
      }).then((a) => {  //fetching contacts of the user
        return a.json();
      })
        .then((parsed) => {
          setContacts(parsed);
        })


      fetch('/userServer', {

        credentials: 'include'
      }).then((a) => { //fetching messages of the user
        return a.json();
      })
        .then((parsed) => {
          setUser(parsed);
        })
      fetch('/socket', {

        method: "GET",
        credentials: "include",
      }).then(() => {
        console.log("successfully fetched")
      }).catch((err) => {
        console.log(err);
      });
      socket = io("");

      socket.once('connect', () => {
        console.log('connected')
      })

      socket.on('newMessage', (newMessage) => {
        let message;
        console.log("useEffect is called")
        const boolean = Array.isArray(newMessage.message);
        if (boolean) {
          message = newMessage.message[0];
        } else {
          message = newMessage.message;
        }
        setMessages((value) => {
          value.map((obj) => {
            if (obj._id == newMessage.chatId) {
              return obj.messages[obj.messages.length] = message;
            }
          })
          return [...value];
        })

      });

      socket.on('newEntry', (newEntry) => {
        setContacts((pre) => {
          return [...pre, newEntry];
        });
      })


    } else if (isUser == false) {
      console.log("user not found")
    }

  }, [isUser]);


  useEffect(() => {
    setContacts((contacts) => {
      if (contacts.length != 0) {
        contacts.map((contact) => {
          messages.map((message) => {
            if (contact.chatId == message._id) {
              contact.lastMsg = message.messages[message.messages.length - 1];
            }
          })
        })
      }
      return [...contacts];
    })

  }, [])


  const addContactHandler = (boolean) => {            //function for changing the value of {addcontact} state variable to show or hide the addcontact box
    setaddContact(boolean);
  }

  const dataToCurrentChat = (data) => {   // function to recieve data for current chat from contact.js and store it to currenChatData state object

    setCurrentChatData(data);

    setRightStyle({ display: "block" });
    setLeftStyle({ display: "none" });

  }

  async function logout() {

    const endpoint = '/logoutApi'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }
    const response = await fetch(endpoint, options)

    const result = response.json();

  }
  function toContacts() {
    setRightStyle({ display: "none" });
    setLeftStyle({ display: "block" });
  }

  function clearChat(_id) {
    setMessages((message) => {
      message.map((value) => {
        if (value._id == _id) {
          value.messages = [];
        }
      })
      return [...messages];
    })
  }

  return (
    <>
      <div className="main flex">
        <div className="body flex">
          <div className="left flex" style={leftStyle}>
            <AddContact addContactHandler={addContactHandler} addContact={addContact} />
            <div className="head flex">
              <div className="profile flex">
                <div className='user flex'>
                  <div><Person className="image" /></div>
                  <h3>{user.userName}</h3>
                </div>
                <div className="profile-icons">
                  <Chat></Chat>
                  <div className='user-more-vert-icon'>
                    <MoreVert></MoreVert>
                    <ul className="user-controls">

                      <li className='btnWithIcon' onClick={() => addContactHandler(true)} ><div>New Contact</div><PersonAdd style={{ fontSize: "larger" }}></PersonAdd></li>
                      <li className='btnWithIcon' onClick={logout} ><div>Logout</div><Logout style={{ fontSize: "larger" }}></Logout></li>

                    </ul>
                  </div>
                </div>
              </div>
              <div className="search flex">
                <div className="search-icon flex">
                  <Search></Search>

                  <input type="search" name="search" id="wsearch" placeholder="Search or start new chat" />
                </div>
              </div>
            </div>
            <div className="contacts">
              {contacts.map((value, index) => {
                return <Contact contact={value} key={index} dataToCurrentChat={dataToCurrentChat}></Contact>
              })}
            </div>


          </div>
          <div className="right flex" style={rightStyle}>
            <CurrentChat clearChat={clearChat} userEmail={user.userEmail} toContacts={toContacts} messages={messages} userInfo={currentChatData} />
            <div className="current-message">
              <Form data={currentChatData} />
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

