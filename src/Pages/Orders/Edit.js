import React, { useEffect, useState } from 'react';
import {
  AiOutlineEnvironment,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlinePrinter,
  AiOutlineSave,
  AiOutlineUser
} from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Breadcrumb from '../../Component/Breadcrumb/Breadcrumb';
import HeaderPart from '../../Component/HeaderPart/HeaderPart';
import SideBar from '../../Component/SideBar/SideBar';
import TopBar from '../../Component/TopBar/TopBar';
import { detailsOrder, updateOrder } from '../../redux/Actions/orderActions';
import styles from './order.module.css';

const Edit = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  // redux store
  const OrderDetails = useSelector((state) => state.orderDetails);
  const { orderDetails } = OrderDetails;

  // react hook
  const [changeStatus, setChangeStatus] = useState(orderDetails?.orderStatus);

  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateOrder({
        _id: orderId,
        orderStatus: changeStatus,
      })
    );
  };

  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <SideBar></SideBar>
          <div className="col__10" id="dashboard_body">
            <TopBar></TopBar>
            <HeaderPart></HeaderPart>

            <div className="ds_body w-100">
              <div className="row">
                <Breadcrumb
                  title="Order Details"
                  url="/orders"
                ></Breadcrumb>
              </div>
              
              {orderDetails ? (
                <div className="row">
                  <div className="col-md-8">
                    <form
                      className="bg-white rounded-3 shadow-lg p-4"
                      onSubmit={submitHandler}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p>
                            Invoice :{" "}
                            <span className="text-uppercase">
                              {orderDetails.orderId}
                            </span>{" "}
                            <span>({orderDetails.paymentMethod})</span>
                          </p>
                          <p>05-10-2022</p>
                        </div>
                        <div>
                          <p>Total : ৳ {orderDetails.grandTotal}</p>
                          <p>Status : {orderDetails.orderStatus}</p>
                        </div>
                      </div>
                      <hr />
                      <h5>Product Information</h5>
                      <div className="table-responsive">
                        <table className="table table-borderless align-middle">
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Discounty</th>
                              <th>Amount</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          
                          {orderDetails?.orderItems?.map((x) => (
                            <tbody key={x._id}>
                              <tr>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <div className="me-3">
                                      <img
                                        style={{ width: "50px" }}
                                        src={x?.displayImage.data.url}
                                        alt={x.name}
                                      />
                                    </div>
                                    <div>
                                      <Link to="#">{x.name}</Link>
                                    </div>
                                  </div>
                                </td>
                                <td>৳ {x.price}</td>
                                <td>
                                  ৳ {x.price} X {x.qty}
                                </td>
                                <td>{x.discount} %</td>
                                <td>৳ {x.price * x.qty}</td>
                                <td>
                                  <select
                                    value={changeStatus}
                                    onChange={(e) =>
                                      setChangeStatus(e.target.value)
                                    }
                                  >
                                    <option>Pending</option>
                                    <option>Processing</option>
                                    <option>Picked</option>
                                    <option>Canceled</option>
                                    <option>Delayed</option>
                                    <option>Delivered</option>
                                  </select>
                                </td>
                              </tr>
                            </tbody>
                          ))}
                        </table>
                        <div className="d-flex justify-content-end me-5">
                          <div className="w-25 text-end">
                            <table className="table align-middle">
                              <tr>
                                <td>Subtotal</td>
                                <td>৳ {orderDetails.subTotal}</td>
                              </tr>
                              <tr>
                                <td>Tax</td>
                                <td>৳ {orderDetails.taxPrice}</td>
                              </tr>
                              <tr>
                                <td>Shipping</td>
                                <td>৳ {orderDetails.shippingPrice}</td>
                              </tr>
                              <tr>
                                <td>Grand Total</td>
                                <td>৳ {orderDetails.grandTotal}</td>
                              </tr>
                              <tr>
                                <td>Total Paid</td>
                                <td>৳ 0.00</td>
                              </tr>
                              <tr>
                                <td>Balance</td>
                                <td>৳ {orderDetails.grandTotal}</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                        <hr />
                        <div className="text-end">
                          <button type="button" className="myButton me-3">
                            <AiOutlinePrinter /> Print
                          </button>
                          <button type="submit" className="myButton">
                            <AiOutlineSave /> Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="col-md-4">
                    {/* user info */}
                    <div className="bg-white rounded-3 shadow-lg p-4">
                      <h5>user info</h5>
                      <hr />
                      <div className="d-flex align-items-center">
                        <p className="me-3">
                          <AiOutlineUser style={{ fontSize: "20px" }} />
                        </p>
                        <p>{orderDetails?.user?.name}</p>
                      </div>
                      <div className="d-flex align-items-center">
                        <p className="me-3">
                          <AiOutlineMail style={{ fontSize: "20px" }} />
                        </p>
                        <p>{orderDetails?.user?.email}</p>
                      </div>
                      <div className="d-flex align-items-center">
                        <p className="me-3">
                          <AiOutlinePhone style={{ fontSize: "20px" }} />
                        </p>
                        <p>{orderDetails?.user?.phone}</p>
                      </div>
                      <div className="d-flex align-items-center">
                        <p className="me-3">
                          <AiOutlineEnvironment style={{ fontSize: "20px" }} />
                        </p>
                        <p>{orderDetails?.shippingAddress?.address}</p>
                      </div>
                    </div>
                    {/* entrepreneur infomation */}
                    <div className="bg-white rounded-3 shadow-lg p-4 mt-4">
                      <h5>Entrepreneur Info</h5>
                      <hr />
                      <div
                        className={`d-flex align-items-center my-4 ${styles.entrepreneur}`}
                      >
                        <div>
                          <img
                            src="https://oikko-online-shopping-bangladesh.s3.ap-south-1.amazonaws.com/5.jpg1634618270116"
                            alt=""
                          />
                        </div>
                        <div className="ms-3">
                          <Link
                            className="d-block mb-2"
                            to="/entrepreneur/details/6157f5aa1b81751b6c14e349"
                          >
                            Azizur Rahman
                          </Link>
                          <span className="text-secondary">
                            আজিজুর রহমান তাঁর পূর্বপুরুষদের ঐতিহ্য লালন করে
                            জামদানি শাড়ি তৈরির শিক্ষা গ্রহণ করেন পরিবার...
                          </span>
                        </div>
                      </div>

                      <div className="d-flex align-items-center">
                        <p className="me-3">
                          <AiOutlineMail style={{ fontSize: "20px" }} />
                        </p>
                        <p>azizurrahman202@gmail.com</p>
                      </div>
                      <div className="d-flex align-items-center">
                        <p className="me-3">
                          <AiOutlinePhone style={{ fontSize: "20px" }} />
                        </p>
                        <p>01854540050</p>
                      </div>
                      <div className="d-flex align-items-center">
                        <p className="me-3">
                          <AiOutlineEnvironment style={{ fontSize: "20px" }} />
                        </p>
                        <p>Dhaka,bangladesh.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                "Loading.. ."
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Edit;