import React, { useEffect, useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';
import { apiConfig } from '../../Constants/ApiConfig';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import { Toaster, toast } from 'react-hot-toast';

const ServiceProviderDash = () => {

  const [date, setdate] = useState(dayjs())
  const [bookings, setBookings] = useState([])
  const [onDate, setOnDate] = useState([])
  const [totalPrice, setTotalPrice] = useState("")
  const [courtsBooked, setCourtsBooked] = useState("")
  const [userDetails, setUserDetails] = useState({});
  const [sportNames, setSportNames] = useState({});

  useEffect(() => {
    const headers = {
      "token": Cookies.get("token"),
      "role": Cookies.get("role")
    };

    const fetchAllBookingDetails = async () => {
      try {
        const response = await axios.get(`${apiConfig.userSlot}/getall`, { headers });
        const data = await response.data;
        setBookings(data);

        const particularDate = date.format('YYYY-MM-DD');

        const bookingsOnDate = data.filter(booking => booking.dateOfBooking === particularDate);

        // Calculate the count of bookings on the particular date
        setOnDate(bookingsOnDate.length);

        // Calculate the total price for the bookings on the particular date
        const totalPriceOnDate = bookingsOnDate.reduce((sum, booking) => sum + booking.priceToBePaid, 0);
        setTotalPrice(totalPriceOnDate);

        const courtsBooked = bookingsOnDate.reduce((total, booking) => {
          const courts = booking.courtNumber.split(',');
          return total + courts.length;
        }, 0);
        setCourtsBooked(courtsBooked);

        const fetchUserDetails = async (userId) => {
          const response = await axios.get(`${apiConfig.auth}/getuserdetailsbyuserid`, {
            headers: { userId }
          });
          return response.data.userName;
        };

        const fetchSportName = async (spId, sportId) => {
          const response = await axios.get(`${apiConfig.sp}/getsportbyspidandsportid`, {
            headers: { spId, sportId }
          });
          return response.data.sportName;
        };

        const userDetailsMap = {};
        const sportNamesMap = {};

        await Promise.all(data.map(async (booking) => {
          const userName = await fetchUserDetails(booking.userId);
          userDetailsMap[booking.userId] = userName;

          const sportName = await fetchSportName(booking.spId, booking.sportId);
          sportNamesMap[`${booking.spId}_${booking.sportId}`] = sportName;
        }));

        setUserDetails(userDetailsMap);
        setSportNames(sportNamesMap);
      } catch (error) {
        toast.error("Error fetching booking details:", {
          duration: 3000,
          position: "top-right"
        });
      }
    };



    fetchAllBookingDetails();
  }, [date, apiConfig]);

  return (
    <>

      <div style={{ marginLeft: "300px" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label="Select the date"
              format='DD-MMMM-YYYY'
              onChange={(newValue) => setdate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className="fixed left-0  w-64 h-full bg-[#f8f4f3] p-4 z-50 sidebar-menu transition-transform">
        <ul className="mt-4">
          <span className="text-gray-400 font-bold">Your Dashboard</span>
          <li className="mb-1 group">
            <a href="" className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
              <i className="ri-home-2-line mr-3 text-lg"></i>
              <span className="text-sm">Dashboard</span>
            </a>
          </li>
          <li className="mb-1 group">
            <a href="" className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
              <i className='bx bx-user mr-3 text-lg'></i>
              <span className="text-sm">Number of bookings</span>
              <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
            </a>
            <ul className="pl-7 mt-2 hidden group-[.selected]:block/">
              <li className="mb-4">
                <a href="" className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">All</a>
              </li>
              <li className="mb-4">
                <a href="" className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Roles</a>
              </li>
            </ul>
          </li>
          <li className="mb-1 group">
            <a href="" className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
              <i className='bx bx-list-ul mr-3 text-lg'></i>
              <span className="text-sm">Activities</span>
            </a>
          </li>
          <span className="text-gray-400 font-bold">BLOG</span>
          <li className="mb-1 group">
            <a href="" className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle">
              <i className='bx bxl-blogger mr-3 text-lg' ></i>
              <span className="text-sm">Post</span>
              <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90"></i>
            </a>
            <ul className="pl-7 mt-2 hidden group-[.selected]:block/">
              <li className="mb-4">
                <a href="" className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">All</a>
              </li>
              <li className="mb-4">
                <a href="" className="text-gray-900 text-sm flex items-center hover:text-[#f84525] before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">Categories</a>
              </li>
            </ul>
          </li>
          <li className="mb-1 group">
            <a href="" className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
              <i className='bx bx-archive mr-3 text-lg'></i>
              <span className="text-sm">Archive</span>
            </a>
          </li>
          <span className="text-gray-400 font-bold">PERSONAL</span>
          <li className="mb-1 group">
            <a href="" className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
              <i className='bx bx-bell mr-3 text-lg' ></i>
              <span className="text-sm">Notifications</span>
              <span className=" md:block/ px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-600 bg-red-200 rounded-full">5</span>
            </a>
          </li>
          <li className="mb-1 group">
            <a href="" className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100">
              <i className='bx bx-envelope mr-3 text-lg' ></i>
              <span className="text-sm">Messages</span>
              <span className=" md:block/ px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-600 bg-green-200 rounded-full">2 New</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"></div>

      <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all main">

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
              <div className="flex justify-between mb-6">
                <div>
                  <div className="flex items-center mb-1">
                    <div className="text-2xl font-semibold">{bookings && onDate}</div>
                  </div>
                  <div className="text-sm font-medium text-gray-400">Number of bookings</div>
                </div>
                <div className="dropdown">
                  <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
                  <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                    <li>
                      <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                    </li>
                  </ul>
                </div>
              </div>

              <a href="/gebruikers" className="text-[#f84525] font-medium text-sm hover:text-red-800">View</a>
            </div>
            <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
              <div className="flex justify-between mb-4">
                <div>
                  <div className="flex items-center mb-1">
                    <div className="text-2xl font-semibold">₹{bookings && totalPrice}</div>
                  </div>
                  <div className="text-sm font-medium text-gray-400">Total amount received</div>
                </div>
                <div className="dropdown">
                  <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
                  <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                    <li>
                      <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
              <a href="/dierenartsen" className="text-[#f84525] font-medium text-sm hover:text-red-800">View</a>
            </div>
            <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
              <div className="flex justify-between mb-6">
                <div>
                  <div className="text-2xl font-semibold mb-1">{bookings && courtsBooked}</div>
                  <div className="text-sm font-medium text-gray-400">Total courts booked</div>
                </div>
                <div className="dropdown">
                  <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
                  <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                    <li>
                      <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
              <a href="" className="text-[#f84525] font-medium text-sm hover:text-red-800">View</a>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
              <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md lg:col-span-2">
                <div className="flex justify-between mb-4 items-start">
                  <div className="font-medium">Today's Bookings</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  {bookings.map((booking) => (
                    <div key={booking.slotId}>
                      <div className="rounded-md border border-solid border-gray-200 p-4">
                        <div className="flex items-center mb-0.5">
                          <div className="text-xl font-semibold">{userDetails[booking.userId] || "Loading..."}</div>
                        </div>
                        <span className="text-gray-400 text-sm">Player name</span>
                      </div>
                      <div className="rounded-md border border-solid border-gray-200 p-4">
                        <div className="flex items-center mb-0.5">
                          <div className="text-xl font-semibold">{sportNames[`${booking.spId}_${booking.sportId}`] || "Loading..."}</div>
                        </div>
                        <span className="text-gray-400 text-sm">Sport</span>
                      </div>
                      <div className="rounded-md border border-solid border-gray-200 p-4">
                        <div className="flex items-center mb-0.5">
                          <div className="text-xl font-semibold">₹{booking.priceToBePaid}</div>
                        </div>
                        <span className="text-gray-400 text-sm">Price paid</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <canvas id="order-chart"></canvas>
                </div>
              </div>
              <div>
                <canvas id="order-chart"></canvas>
              </div>
            </div>
            <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
              <div className="flex justify-between mb-4 items-start">
                <div className="font-medium">Earnings</div>
                <div className="dropdown">
                  <button type="button" className="dropdown-toggle text-gray-400 hover:text-gray-600"><i className="ri-more-fill"></i></button>
                  <ul className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]">
                    <li>
                      <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Profile</a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Settings</a>
                    </li>
                    <li>
                      <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50">Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[460px]">
                  <thead>
                    <tr>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">Service</th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Earning</th>
                      <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="flex items-center">
                          <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                          <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-emerald-500">+$235</span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="inline-block/ p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="flex items-center">
                          <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                          <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-rose-500">-$235</span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="inline-block/ p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="flex items-center">
                          <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                          <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-emerald-500">+$235</span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="inline-block/ p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="flex items-center">
                          <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                          <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-rose-500">-$235</span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="inline-block/ p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="flex items-center">
                          <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
                          <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-emerald-500">+$235</span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="inline-block/ p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="flex items-center">
                          <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block/" />
                          <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-rose-500">-$235</span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="inline-block/ p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="flex items-center">
                          <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block/" />
                          <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-emerald-500">+$235</span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="inline-block/ p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="flex items-center">
                          <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block/" />
                          <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-rose-500">-$235</span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="inline-block/ p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="flex items-center">
                          <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block/" />
                          <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-emerald-500">+$235</span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="inline-block/ p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">Pending</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <div className="flex items-center">
                          <img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block/" />
                          <a href="#" className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate">Create landing page</a>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="text-[13px] font-medium text-rose-500">-$235</span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-50">
                        <span className="inline-block/ p-1 rounded bg-rose-500/10 text-rose-500 font-medium text-[12px] leading-none">Withdrawn</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Toaster />

      <script src="https://unpkg.com/@popperjs/core@2"></script>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <script src="src\Styles\DashboardStyles\DashBoard.jsx"></script>
    </>
  )
}


export default ServiceProviderDash;