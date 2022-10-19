let more = document.getElementById('more');
let mainContent = document.getElementById('mainContent');
let marksObtained = document.getElementById('marksObtained');
let examinationDate = document.getElementById('examinationDate');
let previousExamMarksPercentage = document.getElementById('previousExamMarksPercentage');
let attendancePercentage = document.getElementById('attendancePercentage');
let attendedSessions = document.getElementById('attendedSessions');
let totalSessions = document.getElementById('totalSessions');
let studentProfile = document.querySelector('.student-profile')
let studentProfileInnerDiv = document.querySelector('.studentProfileInnerDiv')

more.addEventListener("click" , () => {
    mainContent.classList.toggle('activemainContent');
    if(studentProfile.style.visibility == 'visible'){
        studentProfile.style.visibility = 'hidden';
        studentProfileInnerDiv.style.visibility = 'hidden';
        studentProfile.style.width = '0%';
        studentProfile.style.transition = 'none';
        studentProfileInnerDiv.style.transition = 'none';
    }
    else{
        setTimeout(() => {
            studentProfile.style.visibility = 'visible';
            studentProfile.style.width = '24%';
            studentProfile.style.transition = 'width 1s';
            setTimeout(() => {
                studentProfileInnerDiv.style.visibility = 'visible';
                studentProfileInnerDiv.style.transition = '1s';
            },1000)
        } , 2000)
    }
    

} );

labels = ['24-07-2022' , '25-07-2022' , '26-07-2022' ,'27-07-2022','29-07-2022'];
data1 = [15,20,3,10,15];
marks = 10;//Database Value
attendanceValue = 80;//Database Value
dateOfPreviousExam = '29-07-2022';
marksPercentage = marks * 100 / 20
marksPercentageGraph = (marks-0.99) * 100 / 20;
marksPercentageValue = 472 - (472 * marksPercentageGraph/100);
document.documentElement.style.setProperty('--percentage1' , marksPercentageValue);
marksObtained.innerHTML = 'Marks Obtained: ' + marks ;
examinationDate.innerHTML = 'Examination Date: '+ dateOfPreviousExam ;
attendancePercentageGraph = (attendanceValue -0.99) ; //attendance percentage if directly taken from database
attendancePercentageValue = 472 - (472 * attendancePercentageGraph/100);
document.documentElement.style.setProperty('--percentage2' , attendancePercentageValue);
attendedSessions.innerHTML = 'Attended Sessions: '+ attendanceValue ;
totalSessions.innerHTML = 'Total Sessions: '+ 100;

let counter1 = 0;
setInterval(() => {
    if(counter1 == marksPercentage){
        clearInterval();
    }
    else{
        counter1 += 1;
        previousExamMarksPercentage.innerHTML = counter1 + "%";
    }
} , (1 / (marksPercentageGraph / 100)) );

let counter2 = 0;
setInterval(() => {
    if(counter2 == attendanceValue){
        clearInterval();
    }
    else{
        counter2 += 1;
        attendancePercentage.innerHTML = counter2 + "%";
    }
} , (1 / (attendancePercentageGraph / 100)) )



//Chart js

const data = {
    labels : labels,
    datasets: [{
        label: 'Marks',
        data: data1,
        pointHoverRadius: 7,
        backgroundColor : '#6E00FF',
        pointBorderColor: '#ffffff',
        borderWidth: 5,
        pointRadius: 6,
        pointHoverBackgroundColor: '#6E00FF',
        pointHoverBorderColor: 'white',
        pointHoverRadius:9,
        pointHoverBorderWidth : 5,
        tension: 0.5,
    }]
};

const config = {
    type : 'line',
    data,
    options: {
        maintainAspectRatio: false,
        borderWidth: 7,
        borderColor: '#8426FF',
        scales: {
            xAxes:{
                ticks:{
                    padding:10,
                },
                grid: {
                    display: false,
                    borderDash: [8, 4],
                },
            },
            yAxes:{
                beginAtZero : true,
                ticks:{
                    stepSize : 5,
                    fontFamily: "'Nunito' , sans-serif",
                    padding: 10,
                },
                grid: {
                    borderDash: [8, 4],
                    borderColor : '#fff',
                },
            }        
        },
        plugins: {
            legend: {
              display: false
            },
            tooltip:{
                displayColors:false,
                xAlign: 'right',
                backgroundColor:'#fff',
                borderColor:'#000',
                borderWidth: 1,
                titleColor: '#000',
                bodyColor: '#000',
            }
          },
          interaction: {
            mode: 'index',
            axis: 'x',
            intersect: false
          },
    }
};

const myChart = new Chart(
    document.getElementById('performancegraphline'),
    config
)

