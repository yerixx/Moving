import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  color: ${(props) => props.theme.white.darker};
  font-size: 18px;
  position: fixed;
  top: 0;
  z-index: 1;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const Logo = styled(motion.svg)`
  width: 130px;
  height: 35px;
  fill: ${(props) => props.theme.blue};
  cursor: pointer;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Item = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  transition: opacity 0.3s;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  bottom: -7px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${(props) => props.theme.red};
`;

const Search = styled.form`
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    fill: ${(props) => props.theme.white.darker};
  }
`;

const Input = styled(motion.input)`
  width: 200px;
  position: absolute;
  left: -170px;
  transform-origin: right center;
  background: transparent;
  color: ${(props) => props.theme.white.darker};
  font-size: 18px;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.white.darker};
  &:focus {
    outline: none;
  }
`;

const logoVariants = {
  normal: { fillOpacity: 1 },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};

interface IForm {
  keyword: string;
}

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useMatch("/home");
  const homeModalMatch = useMatch("/home/movies/*");
  const tvMatch = useMatch("/home/tv");
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  const main = useNavigate();
  const goToMain = () => {
    main("/home");
  };

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = (data: IForm) => {
    main(`/home/search?keyword=${data.keyword}`);
    setValue("keyword", "");
  };

  const navVariants = {
    top: { background: "rgba(0, 0, 0, 1)" },
    scroll: { background: "rgba(0, 0, 0, 0.3)" },
  };

  useEffect(() => {
    scrollY.on("change", () => {
      if (scrollY.get() > 60) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY]);

  const openSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setSearchOpen((prev) => !prev);
  };

  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <Col>
        <Logo
          onClick={goToMain}
          // variants={logoVariants}
          // initial="normal"
          // whileHover="active"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 208.49 54.99"
        >
          <polygon
            className="cls-1"
            points="36.1 27.43 35.68 27.43 32.87 6.99 16.32 6.98 14.4 11.08 17.61 11.08 17.14 14.62 9.41 14.62 7.05 20.43 16.35 20.69 13.79 40.24 11.42 40.24 10.64 43.02 7.14 43.02 5.76 47.12 12.89 47.12 16.3 47.12 23.77 47.12 26.86 27.64 27.19 27.64 29.4 47.12 38.09 47.12 44.51 27.64 44.88 27.64 43.37 47.12 53.93 47.12 56.88 6.99 42.5 6.98 36.1 27.43"
          />
          <path
            className="cls-1"
            d="M89,14.25a9.64,9.64,0,0,0-4.48-3.51A19.66,19.66,0,0,0,77.26,9.6a21.16,21.16,0,0,0-7.4,1.14,11.86,11.86,0,0,0-5,3.51,16.21,16.21,0,0,0-3,6.06,45.82,45.82,0,0,0-1.43,8.79,44.78,44.78,0,0,0,0,8.48,13.87,13.87,0,0,0,2,6.06,9.57,9.57,0,0,0,4.47,3.64,19.25,19.25,0,0,0,7.41,1.21,20.77,20.77,0,0,0,7.6-1.21,11.93,11.93,0,0,0,5-3.64,16.16,16.16,0,0,0,2.92-6.06,46.09,46.09,0,0,0,1.35-8.48,42.87,42.87,0,0,0-.08-8.79A13.8,13.8,0,0,0,89,14.25ZM79.51,35.18a3.09,3.09,0,0,1-1.14,2.6,6.53,6.53,0,0,1-3.15.57H70.86l1.19-15.44c.11-1.35.49-2.22,1.16-2.6a6.47,6.47,0,0,1,3.09-.57h4.4Z"
          />
          <polygon
            className="cls-1"
            points="114.06 10.49 107.76 34.04 107.28 34.04 104.65 10.49 93.64 10.49 98.88 47.6 111.24 47.6 125.07 10.49 114.06 10.49"
          />
          <polygon
            className="cls-1"
            points="124.82 47.6 135.27 47.6 138.13 10.49 127.68 10.49 124.82 47.6"
          />
          <path
            className="cls-1"
            d="M160.66,26.52h-.22a13,13,0,0,0,0-1.83,3.27,3.27,0,0,0-.27-1l-7-13.16h-9.83L140.49,47.6h10.45l1.23-16h.22a13,13,0,0,0,0,1.83,2.82,2.82,0,0,0,.27,1l6.95,13.16h9.84l2.86-37.11H161.89Z"
          />
          <path
            className="cls-1"
            d="M191.16,28.33l-1.56,7.36,4-1L193,36.94c-.08,1.06-1.14,1.47-1.73,1.78a6.16,6.16,0,0,1-2.8.47H184l1.6-16.72c.1-1.18,1.35-2.08,2.31-2.48a14.28,14.28,0,0,1,4.88-.59,30.15,30.15,0,0,1,3.55.22,4.76,4.76,0,0,1,1.14.15l4-7.85c-.51-.19-.58-1.25-1.42-1.43s-1.23-.27-2.17-.42-1.89-.26-2.83-.35-1.75-.12-2.45-.12a25.21,25.21,0,0,0-8,1.09,12.19,12.19,0,0,0-5.36,3.44,15.72,15.72,0,0,0-3.2,6A41.17,41.17,0,0,0,174.57,29a46.68,46.68,0,0,0,0,8.48,14,14,0,0,0,1.95,6.09A9.55,9.55,0,0,0,181,47.26a19.18,19.18,0,0,0,7.45,1.23c7,0,6-2.48,11-5.19l3.27-18Z"
          />
        </Logo>
        <Items>
          <Item>
            <Link to={"/home"}>
              영화
              {homeMatch && <Circle layoutId="circle" />}
              {homeModalMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to={"/tv"}>
              드라마 {tvMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={openSearch}
            animate={{ x: searchOpen ? -194 : 0 }}
            transition={{ type: "linear" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </motion.svg>
          <Input
            {...register("keyword", { required: true })}
            type="text"
            transition={{ type: "linear" }}
            placeholder="Search for MOVIE or TV"
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
          />
        </Search>
      </Col>
    </Nav>
  );
};

export default Header;
