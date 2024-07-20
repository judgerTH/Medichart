import React, { useState, useEffect } from "react";
import styles from "./AdminMain.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const AdminMain = () => {
  const [data, setData] = useState([]);

  const getWeeklySignupData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/weekly-visitor-count"
      );
      const rawData = response.data;

      // 날짜 생성 함수
      const generateDateLabels = (daysAgo) => {
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      };

      // 데이터 변환
      const formattedData = rawData.map((value, index) => ({
        name: generateDateLabels(index),
        방문자: value,
      }));

      setData(formattedData);
      console.log(formattedData);
    } catch (error) {
      console.error("Error fetching weekly visitor data:", error);
    }
  };

  useEffect(() => {
    getWeeklySignupData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <h2>관리자 메뉴</h2>
        <div id={styles.line}>
          <ul>
            <li>
              <Link to="/admin/noticeList" className={styles.link}>
                - 공지사항 관리
              </Link>
            </li>
            <li>
              <Link to="/admin/inquiryList" className={styles.link}>
                - 문의사항 관리
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div style={{ flex: 1, marginLeft: "1px" }}>
        <div className="chart-container" style={{ marginTop: "140px" }}>
          <div style={{ textAlign: "right", marginBottom: "10px" }}>
            <Link to="/admin/main" className={styles.button}>
              오늘/
            </Link>
            <Link to="/admin/month" className={styles.button}>
              월별/
            </Link>
            <Link to="/admin/year" className={styles.button}>
              연도별
            </Link>
          </div>
          <ResponsiveContainer width="97%" height={500}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="방문자" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className={styles.inner}>
        <h2>광고배너</h2>
        <div id={styles.line}>
          <ul>
            <li>광고자리------</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminMain;
