import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ViewReport = () => {
    const location = useLocation();
    const { query: locationQuery, report: locationReport } = location.state || {};
    const [query, setQuery] = useState(locationQuery || "");
    const [report, setReport] = useState(locationReport || "");
    const [isReport, setIsReport] = useState(true);

    useEffect(() => {
        if (!query || !report) {
          const saved = sessionStorage.getItem("reportData");
          if (saved) {
            const parsed = JSON.parse(saved);
            setQuery(parsed.query);
            setReport(parsed.report);
          } else {
            setIsReport(false);
          }
        }
      }, [query, report]);

    if(!isReport) {
        return (
            <Box>
              <Typography variant="h2">No Report Found</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                color: "black",
                padding: 2,
                borderRadius: 2,
                "& h1": { fontSize: "2rem", fontWeight: "bold" },
                "& code": { background: "#222", padding: "2px 4px", borderRadius: "4px" },
                "& pre": { background: "#222", padding: "8px", borderRadius: "8px", overflowX: "auto" },
            }}
        >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {`# Research Topic: ${query}\n\n${report}`}
            </ReactMarkdown>
        </Box>
    );
}
export default ViewReport;