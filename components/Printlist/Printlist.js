import React from 'react';
import PrintButton from '../ui/PrintButton';
import ScrollToTop from "react-scroll-to-top";
import RenderOverAllPassFailPieChart from '../ui/OverAllPassFailPieChart';

const ResultHeader = ({ examCode }) => {
    return (
        <table className="w-[100%]" key="Heading">
            <tbody key="heading_tbody">
                <tr>
                    <th>{examCode} RESULTS</th>
                </tr>
            </tbody>
        </table>
    );
};

const ResultRow = ({ details, examResults }) => {
    // Check if any required fields are 'N/A'
    if (!details || !details.NAME || !details.ROLL_NO || !details.COLLEGE_CODE || !details.FATHER_NAME) {
      return null;
    }
  
    return (
      <tr key={details.NAME}>
        <th>{details.NAME}</th>
        <th>{details.ROLL_NO}</th>
        <th>{details.COLLEGE_CODE}</th>
        <th>{details.FATHER_NAME}</th>
        <th>{examResults.credits}</th>
        <th>{examResults.SGPA}</th>
        <th className={examResults.status === 'PASSED' ? 'pass' : 'fail'}>{examResults.status}</th>
      </tr>
    );
  };
  

const Printlist = ({ query }) => {
    const examCode = Object.keys(query[0]['Results'])[0];
    const numStudentsPassed = query.filter((result) => result.Results[examCode].status === "PASSED" && result.DETAILS && result.DETAILS.NAME).length;
    const numStudentsFailed = query.filter((result) => result.Results[examCode].status !== "PASSED" && result.DETAILS && result.DETAILS.NAME).length;
    const totalStudents = query.filter((result) => result.DETAILS && result.DETAILS.NAME).length;

    return (
        <div key="Results" className="m-2 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]">
            <ResultHeader examCode={examCode} />
            <table className="w-[100%]" key="Details">
                <tbody key="Details_tbody">
                    <tr>
                        <th>NAME</th>
                        <th>ROLL NO</th>
                        <th>COLLEGE CODE</th>
                        <th>FATHER NAME</th>
                        <th>CREDITS</th>
                        <th>SGPA</th>
                        <th>STATUS</th>
                    </tr>
                    {query.map((result, index) => {
                        if (index === null) {
                            return null;
                        }
                        return (
                            <ResultRow
                                key={result.DETAILS && result.DETAILS.NAME ? result.DETAILS.NAME : "N/A"}
                                details={result.DETAILS}
                                examResults={result.Results[examCode]}
                            />
                        );
                    })}
                    <tr>
                        <th colSpan={4}>Total Students:</th>
                        <th>{totalStudents}</th>
                        <th colSpan={2}>
                        Pass: {numStudentsPassed} ({totalStudents > 0 ? ((numStudentsPassed / totalStudents) * 100).toFixed(2) : 0}%), Fail: {numStudentsFailed} ({totalStudents > 0 ? ((numStudentsFailed / totalStudents) * 100).toFixed(2) : 0}%)
                        </th>
                    </tr>
                </tbody>
            </table>
            {/* <RenderOverAllPassFailPieChart
                numStudentsPassed={query}
                numStudentsFailed={query}
            /> */}
            <PrintButton />
            <ScrollToTop
                className='scroller'
                smooth
                viewBox="-5 0 18 18"
                svgPath="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                style={{ bottom: "30px", opacity: 0.75, backgroundColor: 'grey' }}
            />
        </div>)

}
export default Printlist;