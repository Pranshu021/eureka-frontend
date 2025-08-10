
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layout from "../components/Layout";
import { useState } from 'react';
import { generateReport, downloadReport } from "../services/reportServices";

interface Message {
    text: string;
    type: "success" | "error" | "info" | "warning";
}

interface ReportData {
    report: string;
    query: string;
    downloadUrl: string
}

const Home = () => {
    const [localReportData, setLocalReportData] = useState<ReportData>({report: "", query: "", downloadUrl: ""});
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<Message>({
        text: "",
        type: "info",
    });

    const handleSubmitQuery = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ text: "Generating report...", type: "info" });
        if (!query) {
            setMessage({ text: "Please enter a research topic.", type: "error" });
            return;
        }
        try {
            const data = await generateReport(query)
            setLocalReportData({query: data.query ,report: data.report, downloadUrl: data.download_url});
            setIsLoading(false);
            setMessage({ text: "Success! Report generated", type: "success" });
        } catch (error) {
            console.error("Error generating report:", error);
            setMessage({ text: "Error! Failed to Generate Report. Please try again later.", type: "error" });
            setIsLoading(false);
        }
    }

    const handleViewClick = (e: React.FormEvent, localReportData: ReportData) => {
        e.preventDefault();
        sessionStorage.setItem("reportData", JSON.stringify(localReportData));
        window.open("/viewReport", "_blank");
    }

    const handleDownloadClick = async (e: React.MouseEvent, downloadURL: string) => {
        e.preventDefault();
    
        try {
            const response = await downloadReport(downloadURL);
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", downloadURL?.split('/').pop() || "report.doc"); // Use the last part of the URL as filename
            document.body.appendChild(link);
            link.click();
    
            // Cleanup
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading file:", error);
            alert("Failed to download file. Please try again.");
        }
    };

    return (
        <Layout backgroundImage="./background.jpg">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    minHeight: "80vh",
                    gap: 3,
                }}
            >
                <Typography
                    fontSize="2.5rem"
                    fontWeight="700"
                    color="white"
                    sx={{
                        textShadow: "0 0 10px rgba(0,255,255,0.4)",
                        animation: "pulse 2s infinite",
                        "@keyframes pulse": {
                            "0%": { textShadow: "0 0 10px rgba(0,255,255,0.8)" },
                            "50%": { textShadow: "0 0 20px rgba(0,255,255,1)" },
                            "100%": { textShadow: "0 0 10px rgba(0,255,255,0.6)" },
                        },
                    }}
                >
                    Eureka – Agentic AI Research Team
                </Typography>

                <TextField
                id="outlined-basic"
                label="Enter a topic to research..."
                variant="outlined"
                InputLabelProps={{
                    sx: {
                        color: "rgba(255,255,255,0.9)",
                        
                        transform: "translate(14px, 14px) scale(1)", // initial position
                        "&.MuiInputLabel-shrink": {
                            transform: "translate(14px, -8px) scale(0.85)", // float position
                            color: "cyan",
                        }
                    }
                }}
                sx={{
                    width: "100%",
                    maxWidth: 500,
                    input: { color: "white", padding: "12px" },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "rgba(0,255,255,0.7)" },
                        "&:hover fieldset": { borderColor: "cyan" },
                        "&.Mui-focused fieldset": {
                            borderColor: "cyan",
                            boxShadow: "0 0 10px cyan",
                        },
                    },
                    }}
                onChange={(e) => setQuery(e.target.value)}
                />

                <Button
                    variant="contained"
                    sx={{
                        bgcolor: "cyan",
                        color: "black",
                        fontWeight: "bold",
                        px: 4,
                        py: 1.2,
                        borderRadius: "30px",
                        textTransform: "uppercase",
                        boxShadow: "0 0 8px cyan",
                        "&:hover": {
                            bgcolor: "#00e5ff",
                            boxShadow: "0 0 20px cyan",
                        },
                        "&:disabled": {
                            bgcolor: "rgba(0, 255, 255, 0.5)",
                            color: "rgba(0, 0, 0, 0.5)",
                            boxShadow: "none",
                        }
                    }}
                    onClick={handleSubmitQuery}
                    disabled={isLoading || !query.trim()}
                >
                    {/* {isLoading ? "Generating Report..." : "Start Research"} */}
                    Start Research
                </Button>
                                
                {message.text !== "" && (
                    <Alert
                        severity={message.type}
                        onClose={() => setMessage({ text: "", type: "info" })}
                        sx={{ width: "100%", maxWidth: 400 }}
                    >
                        {message.text}
                    </Alert>
                )}

                {message.text === "Success! Report generated" && (
                    <Alert severity="success" sx={{ width: "100%", maxWidth: 400 }}>
                        {localReportData ? (<>
                            Your Report has been generated. {
                                <a href="/viewReport" 
                                onClick={(e) => handleViewClick(e, localReportData)} target="_blank" rel="noopener noreferrer">
                                    View Report
                                </a>
                                } &nbsp; or &nbsp; 
                                 {
                                    <a href="#" onClick={(e) => handleDownloadClick(e, localReportData?.downloadUrl)}>
                                        Download Report
                                    </a>
                                }
                        </>) : <></>}
                    </Alert>
                )}

            </Box>
        </Layout>
    );
};

export default Home;
