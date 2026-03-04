import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip
} from "@mui/material";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function App() {
  const [apis, setApis] = useState([]);
  const [status, setStatus] = useState([]);
  const [logs, setLogs] = useState({});

  const fetchData = async () => {
    const apiRes = await axios.get("http://localhost:5001/api/list");
    const statusRes = await axios.get("http://localhost:5001/api/status");

    setApis(apiRes.data);
    setStatus(statusRes.data);

    const logsData = {};

    for (const api of apiRes.data) {
      const res = await axios.get(
        `http://localhost:5001/api/logs/${api._id}`
      );
      logsData[api._id] = res.data.reverse();
    }

    setLogs(logsData);
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatus = (apiId) => {
    return status.find((s) => s._id === apiId);
  };

  return (
    <Container style={{ marginTop: "40px" }}>
      <Typography variant="h4" gutterBottom>
        🚀 API Health Monitor Dashboard
      </Typography>

      <Grid container spacing={3}>
        {apis.map((api) => {
          const s = getStatus(api._id);
          const apiLogs = logs[api._id] || [];

          const chartData = {
            labels: apiLogs.map((l) =>
              new Date(l.timestamp).toLocaleTimeString()
            ),
            datasets: [
              {
                label: "Response Time (ms)",
                data: apiLogs.map((l) => l.responseTime),
                borderColor: "blue",
                fill: false
              }
            ]
          };

          const uptime =
            apiLogs.length > 0
              ? (
                  (apiLogs.filter((l) => l.success).length /
                    apiLogs.length) *
                  100
                ).toFixed(1)
              : "N/A";

          return (
            <Grid item xs={12} md={6} key={api._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{api.name}</Typography>

                  <Typography variant="body2" color="text.secondary">
                    {api.url}
                  </Typography>

                  {s && (
                    <>
                      <Chip
                        label={s.success ? "UP" : "DOWN"}
                        color={s.success ? "success" : "error"}
                        style={{ marginTop: "10px" }}
                      />

                      <Typography style={{ marginTop: "5px" }}>
                        Response: {s.responseTime} ms
                      </Typography>
                    </>
                  )}

                  <Typography style={{ marginTop: "5px" }}>
                    Uptime: {uptime}%
                  </Typography>

                  {apiLogs.length > 0 && (
                    <div style={{ marginTop: "20px" }}>
                      <Line data={chartData} />
                    </div>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default App;