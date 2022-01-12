import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";

const MusicPlayer = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    backdrop-filter: blur(1em);
    // border: 2em solid red;
  }

  &::before {
    background-image: url("https://lh3.googleusercontent.com/xx392abFB50WuvvPIr9u7IxjysNCkYhVsR7slkFDDpL5DqjyoY08DJmqlEvTyjUS_PLay7nG93grY2nD=w544-h544-l90-rj");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &::after {
    background: rgba(0, 0, 0, 0.6);
  }
`;
const Image = styled.img`
  border-radius: 1em;
  width: 100%;
  transform: ${(props) => props.open && "scale(0.1695)"};
  transition: transform 1s ease-in-out;
  transform-origin: -2.4em -3.6em;
`;
const Header = styled.header`
  padding: 4em;
`;
const Title = styled.h1``;
const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 16.95vw - 0.55em);
  bottom: 0;
  position: absolute;
  transform: ${(props) =>
    props.open ? "translateY(0)" : "translateY(calc(100% - 4em))"};
  transition: transform 1s ease-in-out;
`;
const Navigation = styled.nav`
  height: 4em;
  display: flex;
  justyfy-content: space-around;
  position: relative;
  background: rgba(0, 0, 0, 0.2);
  padding: 0 2em;

  &::after {
    content: "";
    height: 0.2em;
    width: calc(((100% - 4em) / 3));
    position: absolute;
    background: #000;
    left: 2em;
    bottom: 0;
    transform: translateX(0);
    transition: transform 0.3s ease-in-out;
  }
`;
const Tab = styled.button`
  width: calc((100% / 3));
  margin: 0;
  background: none;
  border: 0;
  color: #ffffff99;
  cursor: pointer;
  font-weight: 700;
`;

export default function Host() {
  const socketRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");
  const [open, setOpen] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://192.168.1.50:8000/h/${id}`);
    if (socketRef.current == null) {
      socketRef.current = io(`http://192.168.1.50:8000/${id}`);
    }

    const { current: socket } = socketRef;

    socket.on("message", (arg) => {
      console.log(arg);
    });
  }, [id]);

  const { current: socket } = socketRef;

  const handleSendMessage = () => {
    socket.emit("sendAll", { message: newMessage });
  };

  return (
    // <div>
    //   <h1>Host</h1>
    //   <input type='text' onChange={(e) => setNewMessage(e.target.value)} />
    //   <button onClick={() => handleSendMessage()}>Wyślij</button>
    // </div>

    <MusicPlayer>
      <Header onClick={() => setOpen(false)}>
        <Image
          open={open}
          src='https://lh3.googleusercontent.com/xx392abFB50WuvvPIr9u7IxjysNCkYhVsR7slkFDDpL5DqjyoY08DJmqlEvTyjUS_PLay7nG93grY2nD=w544-h544-l90-rj'
        />
        <Title></Title>
      </Header>
      <Wrapper open={open}>
        <Navigation onClick={() => setOpen(true)}>
          <Tab role='tab' tabindex='0'>
            NASTĘPNY
          </Tab>
          <Tab role='tab' tabindex='-1'>
            TEKST
          </Tab>
          <Tab role='tab' tabindex='-1'>
            SZUKAJ
          </Tab>
        </Navigation>
      </Wrapper>
    </MusicPlayer>
  );
}
