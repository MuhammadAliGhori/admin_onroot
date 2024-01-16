import Image from "next/image";
import Link from "next/link";
import logo from "../public/images/logo.svg";
import styles from "../style/home.module.css";
import React from "react";
import { Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

export default function Navbar() {
  return (
    <div>
      <div>
        <header className="container-fluid">
          <div
            className={`row d-flex align-items-center position-relative ${styles.headerhero}`}
          >
            <div
              className={`col-xl-6 col-lg-6 col-md-6 col-sm-6  d-flex justify-content-start ${styles.logo}`}
            >
              {/* logo */}
              <Link href="/" className="mx-3">
                <Image
                  // onClick={handleReload}
                  width={270}
                  height={50}
                  className={styles.logoimage}
                  src={logo}
                  alt="logo"
                />
              </Link>
              {/* uploaes */}
              <div
                className={`icons-right col-xl-3 col-lg-3 col-md-3 col-sm-3 position-absolute d-flex justify-content-end align-items-center ${styles.right_box}`}
              >
                {/* {userIDs && (
                  <div className="mx-3">
                    <DropdownButton
                      id="dropdown-basic-button"
                      title="Pages"
                      variant="info"
                    >
                      <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                      <Dropdown.Item href="/globemap">Globe</Dropdown.Item>
                      <Dropdown.Item href="/upcomingtrips">
                        Upcoming Trips
                      </Dropdown.Item>
                      <Dropdown.Item href="/viewsave">
                        Saves Posts
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                )} */}
                <Button
                  className="bg-transparent border-0 outline-none"
                  // onClick={() => setModalShow(true)}
                ></Button>
                {/* 
                {!userIDs ? (
                  <div onClick={handleCreateItinerary}>
                    <Image
                      width={50}
                      height={50}
                      src={plusicon}
                      alt="plusicon"
                      className={`mx-4 ${styles.plusicon}`}
                      style={{ cursor: !userID ? "not-allowed" : "pointer" }}
                    />
                  </div>
                ) : (
                  <div
                    onClick={handleCreateItinerary1}
                    className="cursor-pointer"
                  >
                    {" "}
                    <Image
                      width={50}
                      height={50}
                      src={plusicon}
                      alt="plusicon"
                      className={`mx-4 ${styles.plusicon}`}
                    />
                  </div>
                )} */}

                {/* {userIDs ? (
                  <>
                    <Image
                      src={logout}
                      width={50}
                      height={50}
                      alt=""
                      onClick={handleLogout1}
                      className={`mx-3 object-fit-contain cursor-pointer ${styles.menicon}`}
                    />
                  </>
                ) : (
                  <>
                    <div onClick={handleCreateItinerary}>
                    </div>
                    <Link href="/login">
                      <Image
                        width={50}
                        height={50}
                        src={men} // Show "Profile" icon for logged-out user
                        alt=""
                        className={`mx-3 ${styles.menicon}`}
                      />
                    </Link>
                  </>
                )} */}
                <Dropdown className="mx-2 ">
                  <Dropdown.Toggle
                    className="text-light fw-bold"
                    variant="info"
                    id="dropdown-basic"
                  >
                    Email Notification
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Single User</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">All Users</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button
                  className="bg-info border-0 outline-none"
                  // onClick={() => setModalShow(true)}
                >
                  <Link
                    href="/login"
                    className="text-decoration-none text-light fw-bold px-3 mx-3"
                  >
                    Login
                  </Link>
                </Button>
              </div>
            </div>
            {/* searchbar */}
            <div className="mr-5 d-flex w-100 justify-content-center">
              {/* <Searchbar /> */}
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
