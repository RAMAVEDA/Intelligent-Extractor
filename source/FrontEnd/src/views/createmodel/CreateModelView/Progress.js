import './Progress.css'

const Progress=(props)=>{
    var step1,step2,step3,step4;
    if (props.value === '1'){
        step1 = 'active';
    }
    if (props.value === '2'){
        step2 = 'active';
    }
    if (props.value === '3'){
        step3 = 'active';
    }
    if (props.value === '4'){
        step4 = 'active';
    }
    return('')
}

export default Progress