import React, { FunctionComponent, useState } from "react";
import { ReactComponent as LogoSmall } from "../assets/icons/LogoSmall.svg";
import { ReactComponent as LogoSmallAlternative } from "../assets/icons/LogoSmallAlternative.svg";
import styled from "styled-components";
import Link from "../utils/UnstyledLink";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { makeStyles, Popover } from "@material-ui/core";
import { logout } from "../firebase/authentication";
import Dialog from "./Dialog";
import { useHistory } from "react-router-dom";
import { devices } from "../constants";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
  },
}));

interface Props {
  alternative?: boolean;
}

const Header: FunctionComponent<Props> = ({ alternative }) => {
  const currentUser = useCurrentUser();
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [openPopover, setOpenPopover] = useState(false);
  const [openLogoutConfirmation, setOpenLogoutConfirmation] = useState(false);
  const [openLoginConfirmation, setOpenLoginConfirmation] = useState(false);

  function onOpenPopover(event: any) {
    setAnchorEl(event.currentTarget);
    setOpenPopover(true);
  }

  function onClosePopover() {
    setOpenPopover(false);
  }

  function onOpenLogoutConfirmation() {
    setOpenPopover(false);
    setOpenLogoutConfirmation(true);
  }

  function onOfferJob() {
    if (currentUser) {
      history.push("/offer-job");
    } else {
      setOpenLoginConfirmation(true);
    }
  }

  function onLogin() {
    history.push("/login");
  }

  function onLogout() {
    logout();
    window.location.reload();
  }

  return (
    <>
      <Container>
        <RightContainer>
          <LogoContainer>
            <Link to="/">{alternative ? <LogoSmallAlternative /> : <LogoSmall />}</Link>
          </LogoContainer>
          {/* <StyledLink alternative={alternative}>بحث عن الوظائف</StyledLink>
          <StyledLink alternative={alternative}>الشركات</StyledLink> */}
        </RightContainer>
        <LeftContainer>
          <ButtonTrans alternative={alternative} onClick={onOfferJob}>
            أعلن عن وظيفة
          </ButtonTrans>
          <OnlyShowInMobile>
            <StyledPersonIcon alternative={alternative} onClick={onOpenPopover} />
          </OnlyShowInMobile>
          {currentUser ? (
            <>
              <Button alternative={alternative} onClick={onOpenPopover}>
                أهلاً {currentUser.displayName?.split(" ")[0]}!
              </Button>
              <Popover
                open={openPopover}
                anchorEl={anchorEl}
                classes={{ paper: classes.paper }}
                onClose={onClosePopover}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <PopoverItem onClick={onOpenLogoutConfirmation}>تسجيل الخروج</PopoverItem>
              </Popover>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button alternative={alternative}>تسجيل الدخول</Button>
              </Link>
              <Popover
                open={openPopover}
                anchorEl={anchorEl}
                classes={{ paper: classes.paper }}
                onClose={onClosePopover}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <PopoverItem>
                  <Link to="/login">تسجيل الدخول</Link>
                </PopoverItem>
              </Popover>
            </>
          )}
        </LeftContainer>
      </Container>
      <Dialog
        open={openLogoutConfirmation}
        message="هل انت متأكد من تسجيل الخروج؟"
        confirmMessage="تسجيل الخروج"
        onConfirm={onLogout}
        onClose={() => setOpenLogoutConfirmation(false)}
      />
      <Dialog
        open={openLoginConfirmation}
        message="يجب عليك تسجيل الدخول قبل ان تعلن عن وظيفة"
        confirmMessage="تسجيل الدخول"
        onConfirm={onLogin}
        onClose={() => setOpenLoginConfirmation(false)}
      />
    </>
  );
};

const Container = styled.div`
  width: 1044px;
  display: flex;
  align-items: center;
  margin-top: 40px;
  align-self: center;

  @media ${devices.mobile} {
    max-width: 90vw;
    margin-top: 10px;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RightContainer = styled(LeftContainer)`
  flex-grow: 1;
`;

const LogoContainer = styled.div`
  margin-left: 40px;
`;

// const StyledLink = styled.p<{ alternative?: boolean }>`
//   font-size: 16px;
//   color: ${(props) => (props.alternative ? "#7749C2" : "#ffffff")};
//   margin-left: 40px;
//   margin-top: 0;
//   margin-bottom: 0;

//   @media ${devices.mobile} {
//     display: none;
//   }
// `;

const ButtonTrans = styled.div<{ alternative?: boolean }>`
  color: ${(props) => (props.alternative ? "#7749C2" : "#ffffff")};
  border-radius: 6px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => (props.alternative ? "#7749C2" : "#ffffff")};
  margin-right: 29px;
  padding: 8px 20px;
  font-size: 12px;
  line-height: 23px;
  font-weight: bold;
  cursor: pointer;

  @media ${devices.mobile} {
    font-size: 10px;
    padding: 4px 10px;
  }
`;

const Button = styled(ButtonTrans)`
  color: ${(props) => (props.alternative ? "#ffffff" : "#643f9f")};
  background: ${(props) =>
    props.alternative ? "linear-gradient(138.12deg, #A783E2 -0.01%, #7749C2 94.77%)" : "#ffffff"};
  border: none;

  @media ${devices.mobile} {
    display: none;
  }
`;

const OnlyShowInMobile = styled.div`
  display: none;

  @media ${devices.mobile} {
    display: inline;
  }
`;

const StyledPersonIcon = styled(PersonIcon)<{ alternative?: boolean }>`
  color: white;
  margin-right: 10px;
`;

const PopoverItem = styled.p`
  color: #643f9f;
  font-size: 12px;
  padding: 5px;
  cursor: pointer;
`;

export default Header;
