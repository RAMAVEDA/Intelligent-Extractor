import React, { useState } from 'react'
import axios from 'axios';
import RegionSelect from 'react-region-select'
// import CardMedia from '@material-ui/core/CardMedia';
import {
  Card, CardContent, IconButton, Typography, Box, Input, Button, Divider, TextField,
  makeStyles, TextareaAutosize, Snackbar, Breadcrumbs
} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination';
import Alert from '@material-ui/lab/Alert';
import {
  Table,
  TableCell,
  TableRow,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  colors,
  MuiDialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress
} from '@material-ui/core'
import clsx from "clsx";
// DropZoneArea
import { DropzoneArea } from 'material-ui-dropzone';
import { AttachFile, AudioTrack, Description, PictureAsPdf, Theaters } from '@material-ui/icons';
import CloseIcon from "@material-ui/icons/Close";
import papers_icon from "../../../assets/images/papers.png";
import help_icon from "../../../assets/images/help-icon2.png";
import selt1_icon from "../../../assets/images/selt1.png";
import selt2_icon from "../../../assets/images/select2.png";
import saveTemp_icon from "../../../assets/images/save_temp.png";
import resetExt_icon from "../../../assets/images/resetExt.png";
import deleteField_icon from "../../../assets/images/delF.png";
// import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: "flex",
    flexDirection: "column",
    marginTop: "10px"
  },
  content: {
    flex: "1 0 auto",
    width: '100%',
    height: '100%',
  },
  cover: {
    width: 151
  },
  button: {
    margin: theme.spacing(1),
    float: "right"
  },
  buttonSuccess: {
    backgroundColor: colors.green[500],
    "&:hover": {
      backgroundColor: colors.green[700]
    }
  },
  buttonProgress: {
    color: colors.green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  upload: {

    position: "absolute",
    // top: "40%",
    // left: "50%"
    top: "12em",
    left: "45%",
    width: "30em"
  },
  bgImg: {
    backgroundImage: `url(${papers_icon})`,
    height: "80vh"
  }
}))

var ModelIntegration = (props) => {
  const [extract, setExtract] = useState({})
  const [imagename, setImage] = useState('')
  const [selected, setSelected] = useState(false)
  const [region, setRegion] = useState({})
  const [regions, setRegions] = useState({ 1: [], 2: [], 3: [] })
  const [page, setPage] = useState(1)
  const [totalpage, setPageTotal] = useState(3)
  const [imagelist, setImageList] = useState(
    [
      // "https://intelligent_extractor.storage.googleapis.com/Upload/c8e38b86-11ca-49c8-b05c-98827d13514b_folder/c8e38b86-11ca-49c8-b05c-98827d13514b_0.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=intelligent-extractor-bucket%40citi-sandbox.iam.gserviceaccount.com%2F20221101%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20221101T090304Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&x-goog-signature=b709818a2d7ef3f2d88093dd767dfeea8f37571bed74cf08dadd19651810be0ea5b66bbfac62d6d0a2b995cd33b334ef1adaac66b03d2c02e9e75cb1ab1be4e6a1272696e8f8a7414f229fdd0332cae44d6e194c84a22b45de07103641c5383e3fedc0833df53d48fdc7c7227721a7d2281a83a46b833f7208ddc3c01c9e0c09eab05ac8040332ce48ac2075d3f3cf1462885bb3c3b46f45065432ae5b96a0cc932d47c79d9ab241fd939b2a5e763689bf86600c4ea13ba75ca78d56aeb6c57d3b5b493ede94fe526dcb5cc34fd4de7c800caa80fc8a88b59bf13ae459c5242e9b753891d3596b476fe643464aad7420b560109d18c1fea438e35325f31b2c38",
      // "https://intelligent_extractor.storage.googleapis.com/Upload/c8e38b86-11ca-49c8-b05c-98827d13514b_folder/c8e38b86-11ca-49c8-b05c-98827d13514b_1.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=intelligent-extractor-bucket%40citi-sandbox.iam.gserviceaccount.com%2F20221101%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20221101T090307Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&x-goog-signature=6d0c12287a25afe963e8835521e4317ea575484a158898109ad9fe943de1872eea0eca5d529780111368d35d8c2b8ee6e50ed063a5dead7e8af1c3108aa57c2dec46ef2a10d466c6e35cfa998bcad751a0b237450410ab6a24b38bcd5daa003ddbcdc32542a3be8c18c718d3529423bc5b15f44f3a43be6a5056e56d97459843980c25872b7656491d097149a9c065fc9a62b762d4a1d4de5726fee4114028b8a2f5a14770ef71f2938526ad6223fbd582f959327279673b36915e5145bdeb6d885466577d99ae0eaced382d504b7ea76220aa23d0413db95b3a2c63b2bbff4624dfb749d0ca4ecf09261822c107565814d3f3ab733c33f70073a2531e24f075",
      // "https://intelligent_extractor.storage.googleapis.com/Upload/c8e38b86-11ca-49c8-b05c-98827d13514b_folder/c8e38b86-11ca-49c8-b05c-98827d13514b_2.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=intelligent-extractor-bucket%40citi-sandbox.iam.gserviceaccount.com%2F20221101%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20221101T090310Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&x-goog-signature=abdcb3fbc3d36cc6bf14909fbf58911f39d3685554e7b436e8c25cd69ae86ab51617783a048038ae13f01a36bf1b7ec56b568ae195c8ddf1d232cf47bd62a095c1c99ffa1f9585f612c3b0e620c997fa19985a961c1d6ffaf800b32b8e117ca9c20e81af86616023477d11d98d731abba53ec8aae236f66b3d506d9717956d9220974caa243ede5bf8bc01d1d322968643d5c5d9b1c7a8907dd9d2a10a6b7778700766c7df6f002fb2f19bf72647a1aca6e6680a9bb5d467b667c2f017d36480489ee77e495c03ddb0aa183064f0b394b3270e5fd6974435813592a407757181a2668ca5401100b440fe7bc5ff0e5f08a7570043d7733f387c33a0ade6e9f127",
      // "https://intelligent_extractor.storage.googleapis.com/Upload/c8e38b86-11ca-49c8-b05c-98827d13514b_folder/c8e38b86-11ca-49c8-b05c-98827d13514b_3.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=intelligent-extractor-bucket%40citi-sandbox.iam.gserviceaccount.com%2F20221101%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20221101T090315Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&x-goog-signature=0f3a22dcfbba71634ab1b7a50936dd2953d071c27f5ea69ef8eb1159681f7eb8b42d8814e0a8d0332467ad749c69ec28f1bb452950cd47e2ca19a003adfdb6a8e8b2e5038d257151ef6eeb6751b396abf0d50a847975eead9e4c2c247d7822c831e704c7342e63cf5967ce8dabfc4628b35c8f1c0dfeeaafd08438360c0da27c71eea670e72a3f6005eacc42a892b6427b2a126c2c497a4b926c43f42ee81659749aafefd249acfa9c80ff04f847122db5148b94bca8263b80d88bdc17d2dc0aad4b1951766798eec8b6002d1c0008d35284e23dfb3c9125ebd0ea0295c55b29e9bae836fb5ae4897d4955ad60307cf8867b2eeb770362091287680ccd1a8b79",
      // "https://intelligent_extractor.storage.googleapis.com/Upload/c8e38b86-11ca-49c8-b05c-98827d13514b_folder/c8e38b86-11ca-49c8-b05c-98827d13514b_4.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=intelligent-extractor-bucket%40citi-sandbox.iam.gserviceaccount.com%2F20221101%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20221101T090319Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&x-goog-signature=510dc1f49acc6bc3a394df5166e1dfffdc74be2ab32b140df1089f9a1a9d5be5361e70adee4559530c88b3d5b52f686f04f7144e08616ffe060d5b4ab76b048f841e5ce81642d7dab0ebe1b03e2a2be05724d99b9179ccdd2e3cc323b67f38ccb84c2a5051ded28e6f72789de574728779aaf78fd343062b6b818f9251029aefd61d5e6cd77ef2e15d58281a95da463cc08bcfaf799e88cfbe9e17031f4089c2480af75a15fceafb6ec9588987e5418e68217969b848ed66c8f857f90b0b1f62fcd016172c0b5cf3b0aa0e2aefe7ac054678ceee16f14857a7ce2b75f4f371bc788faa4b4059bb9cb36f097a770e0e631fc1d12c8b20913b1149067e85c5e778",
      // "https://intelligent_extractor.storage.googleapis.com/Upload/c8e38b86-11ca-49c8-b05c-98827d13514b_folder/c8e38b86-11ca-49c8-b05c-98827d13514b_5.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=intelligent-extractor-bucket%40citi-sandbox.iam.gserviceaccount.com%2F20221101%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20221101T090322Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&x-goog-signature=8530d826ab36b9e7b3f7d1275cfa5b0cc47f762ad662f899abe651d1c95dafca619ea3d6227dd589589cae0866049c6f174f2b74d91d13f3876e862db62260dd4625984d91f2b29054aee854e613e3ed9a8909590c073c3fc3b906b09d0d8075115d45067d2e2c31a660520c9c9d9ed280b5dabc9e8591540a4551c60dd4807328b6bdb80d40c63e035eba0aab6f60e2b441485a5d3dca4e93c210c16c906acc3d0b3ae1d0c05e1d60b4fd8da781709ed16eee6a8ce5886d456526ccc41ee00cdeb2972fed0a418bf64ea90a58805597f7f1b39401ee98bf372eab5b847efb7d2aede0b5b8954c05a2967a1f3aeb0e690f433b47c7276b1fddbb59fa6f38f163",
      // "https://intelligent_extractor.storage.googleapis.com/Upload/c8e38b86-11ca-49c8-b05c-98827d13514b_folder/c8e38b86-11ca-49c8-b05c-98827d13514b_6.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=intelligent-extractor-bucket%40citi-sandbox.iam.gserviceaccount.com%2F20221101%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20221101T090325Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&x-goog-signature=122a5f71a12c18b104e20b246e85147f9d1015fdbded5bf5ac54caf72d99321920efcbcf1168d0aae90ec7c893f401dfcd80c8224e5d3e160e30708fb2721e9929f53d26b6506dea989103adc7a48cd640817e969299abc4413fb836e0c1a0f4fdc820e2fcc06e17eef8b0b7a46b43b4364e32c950f74a241c2d18b61adddb86f7da99be141c4c2100d58a047c3d65ee503039e24a7f1264b5136530d1a597bdaf42349bdfdc19c1c4e2f08549d9eac9ae8e0409448bc9251214ae790834e843bd8ee89f42304605651c894f688e3e5c83d1cf5c05ecfb2e39f5ea78a94d1f98b70bec3d66d4360d0e7b76c7d354044c09ff79d53e1e8309c89452d4e456b5da"
    ]
  )
  const classes = useStyles();
  const [dropfield, setDropField] = useState({ 1: [], 2: [], 3: [] })
  const [fielderror, setFieldError] = useState('')
  const url = process.env.REACT_APP_BASE_URL
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  });

  const [showModel, setShowModel] = useState(false);
  const [helpModel, setHelpModel] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);

  // ['http://127.0.0.1:8000/media/5245cd0b-c65a-4fbe-8129-485e32660037_folder/5245cd0b-c65a-4fbe-8129-485e32660037_0.jpg',
  //   'http://127.0.0.1:8000/media/5245cd0b-c65a-4fbe-8129-485e32660037_folder/5245cd0b-c65a-4fbe-8129-485e32660037_1.jpg',
  //   'http://127.0.0.1:8000/media/5245cd0b-c65a-4fbe-8129-485e32660037_folder/5245cd0b-c65a-4fbe-8129-485e32660037_2.jpg']
  // var resetextract=()=>{
  //   resetextract1()
  //   resetextract1()
  // }
  var resetextract = () => {
    console.log('reset')
    var dropfield1 = {}
    Object.keys(dropfield).map(x => dropfield1[x] = [])
    var regions1 = {}
    Object.keys(regions).map(x => regions1[x] = [])
    console.log(regions1, dropfield1)
    setRegions(regions1)
    // console.log('dropfield1',dropfield,'regions1',regions,'region1',region)
    setDropField(dropfield1)
    setSelected(false)
    setFieldError('')
    setExtract({})
    setRegion({})
    console.log('dropfield', dropfield, 'regions', regions, 'region', region)

  }
  var savemodel = async () => {
    if (Object.keys(extract).length !== props.details.length) {
      setFieldError('Please extract all the fields')
      // return ''
    }
    else {
      var coordinates = {}
      Object.keys(regions).map(x => {
        var temp = {}
        // console.log('page',x,Object.values(regions))
        // if (y.length>0){
        regions[x].map(y => {
          // console.log('y',dropfield[x],y,[y['data']['index']])
          var page = extract[y['data']['value1']].map(x => (JSON.parse(x.replaceAll("'", '"'))['page']))
          if (page.length > 0) {
            // if (y1.includes('data')){
            temp[y['data']['value1']] = {

              page: page[0],
              x: y['x'],
              y: y['y'],
              height: y['height'],
              width: y['width']
            }
          }
          // console.log('temp:',dropfield[x][y['data']['index']],y)
          // }
        })
        coordinates[x] = temp;
        // else console.log('values1',y)
      })
      const dict = {
        coordinate: coordinates,
        modelname: props.docName,
        modelID: sessionStorage.getItem('modelid')
        // modelname:"Sakthi'smodel"
      }
      await axios.post(process.env.REACT_APP_BASE_URL + "savemodel", dict)
        .then(res => {
          console.log(res.data)

          setOpen(true);
          setTimeout(function () {
            document.getElementById('dashboard').click();
          }, 3 * 1000);
        })
    }
  }
  var coordinateExtract = async () => {
    console.log(dropfield, regions)
    var values = []

    Object.values(regions).map(x => {
      if (!Array.isArray(x)) {
        setFieldError('Please map all the fields')
        return
      }
      console.log(x)
      values = [...values, ...x]
    })
    console.log(values, props.details, "---");
    // console.log(dropfield,regions) 
    // values.length === props.details.length values.length === [...new Set(values)].length)
    if (values.length !== props.details.length) {
      setFieldError('Please map all the fields')
      return
    }
    else if (values.length !== [...new Set(values)].length) {
      setFieldError('Please select individual label each fields')
      return
    }
    else {
      setFieldError("")
      var coordinates = {}
      Object.keys(regions).map(x => {
        var temp = {}
        var y = ''
        console.log('values', dropfield[x], regions[x])
        // console.log('page',x,Object.values(regions))
        // if (y.length>0){
        regions[x].map(y => {
          // console.log('y',dropfield[x],y,[y['data']['index']])
          // if (y1.includes('data')){
          // y = regions[x]
          console.log(y)
          // if(y.length>0){
          temp[y['data']['value1']] = {
            x: y['x'],
            y: y['y'],
            height: y['height'],
            width: y['width']
          }
          // }

          coordinates[x] = temp;
          // else console.log('values1',y)
        })
        // }
      })


      console.log("coor :", coordinates)
      // setExtract({})
      const dict = {
        coordinate: coordinates,
        modelname: props.docName
        // modelname:"Sakthi'smodel"
      }
      var t = ''
      await axios.post(process.env.REACT_APP_BASE_URL + "gettext/", dict)
        .then(res => {
          console.log(res.data)
          setExtract(res.data)

          // console.log(res.data['Field1'].map(x=>(JSON.parse(x.replaceAll("'",'"'))['text'])))
        })
    }
  }
  var onChange = e => {
    // console.log('onchange select',selected,e)
    if (!selected) {
      console.log('on change if', regions, e)
      var key2 = regions
      var key1 = dropfield
      setRegion(e)
      console.log('after if', e)
      var k = e
      key2[page] = k
      key1[page] = e
      console.log('on change if end1', regions, e)
      setRegions(key2)
      console.log('on change if end', regions, e)
      setDropField(key1)
    }
  }

  const saveDoc = async (e) => {
    // const data = {modelname:props.docname}
    setSuccess(false);
    setLoading(true);
    setShowModel(true);
    setErrorUpload(false);
    const formData = new FormData()
    formData.append('file', imagename)
    formData.append('modelname', props.docName)
    console.log(formData)
    await axios.post(process.env.REACT_APP_BASE_URL + "upload/", formData)
      .then(res => {
        var li = []
        var pages = {}
        var i = 1
        setPageTotal(res.data.length)
        res.data.map(x => {
          console.log(imagelist, x)
          var v = (x).replace('//m', '/m')
          console.log(v, x)
          li.push(v)
          pages[i] = []
          i += 1
        })
        console.log(li, pages, regions, dropfield)
        setImageList(li)
        setRegions(pages)
        setDropField(pages)
        setSuccess(true);
        setLoading(false);
        setShowModel(false);
      }).catch((err) => {
        setShowModel(false);
        setErrorUpload(true);
      })
  }

  const handleChange = (event, value) => {
    setPage(value)
  };

  const addDropDown = () => {
    let items = [<option key='None' value='None'>
      --None--
    </option>]
    props.details.map(field => {
      items.push(
        <option key={field.fieldname} value={field.fieldname}>
          {field.fieldname}
        </option>
      )
    })
    return items
  }
  const changeRegionData = (x, y, idVal) => {
    try {
      let drop = {}

      console.log('ChangeRegionData1:x,y:', x['index'], y, regions[page][0]['data']['index'], regions[page].findIndex(e => e['data']['index'] === x['index']))

      let index = regions[page].findIndex(e => e['data']['index'] === x['index'])
      console.log(index)
      let regionss = regions
      if (y.target.value !== 'None') {
        var data = y.target.value
        regionss[page][index]['data']['value1'] = data
        // regions_all[page][regionss[0]['data']['index']]=regionss[0]
        console.log('next', regionss)
        setRegions(regionss)
        // drop=select[page]
        // drop[x['index']]=data;
        // document.getElementById("renderDrop"+String(page)+String(x['index'])).value = data
        // select[page]=drop
        // console.log('new drop',select,data,regions)
        // setDropField(select)

      }
      else {
        // document.getElementById("renderDrop"+String(page)+String(x['index'])).value = ''
        // drop=select[page]
        // delete drop[x];
        // select[page]=drop
        // setDropField(select)
      }
      hideSelectHandler(idVal);
    }
    catch (e) { console.log(e) }
  }

  const hideSelectHandler = (idVal) => {
    try {
      document.querySelector("#" + idVal).style.display = "none";
      document.querySelector("#" + idVal + "btn").style.display = "none";
    } catch (err) {
      console.log(err);
    }
  }

  const deleteSelection = (event, selectedBox) => {
    document.querySelector("#" + selectedBox).style.display = "none";
  }

  const regionRenderer = (regionProps) => {
    // console.log(regionProps.data)
    if (!regionProps.isChanging && !selected) {
      let idVal = "renderDrop" + String(page) + String(regionProps.data['index']);
      let selBox = "renderDrop" + String(page) + String(regionProps.data['index']) + "selBox"
      return (
        <div id={selBox} style={{ position: 'absolute', right: 0, bottom: '-1.5em' }} className="custom-bg-box1">
          <select id={"renderDrop" + String(page) + String(regionProps.data['index'])} onChange={(event) => changeRegionData(regionProps.data, event, idVal)} value={regionProps.data.value1} className="custom-mselect1">
            {
              addDropDown()
            }
          </select>
          <button
            id={"renderDrop" + String(page) + String(regionProps.data['index']) + "btn"}
            onClick={(event) => deleteSelection(event, selBox)}
            className='custom-mbtn1'>x</button>
        </div>
      );
    }
  }

  const calculateMaxRegions = () => {
    if (!selected) {
      console.log('reg', regions, page)
      const values = Object.keys(regions).filter(x => x !== String(page))
      console.log(values)
      var n = props.details.length
      // var n = 2
      values.map(x => {
        n -= regions[x].length

      })
      if (n > 0) {
        // console.log('if total :',n,selected,regions)
        return n
      }
      setSelected(true)
      return 0
    }
    return 0
  }

  const helperOpen = () => {
    setHelpModel(true);
  }
  const helperClose = () => {
    setHelpModel(false);
  }

  return (
    <div style={{ marginTop: "6px" }}>
      {imagelist.length > 0 ? (
        <Breadcrumbs aria-label="breadcrumb" style={{ marginLeft: "5px", padding: "5px" }} className="card ">
          <Typography color="text.primary" className="text-light bg-success p-1 pr-2 arrow-right font-bold">
            <strong>Step 1:</strong> Template Configuration
          </Typography>
          <Typography color="text.primary" className="text-light bg-success p-1 pr-2 arrow-right font-bold">
            <strong>Step 2:</strong> Upload Template Documents
          </Typography>
          <Typography color="text.primary" className="text-light bg-info p-1 pr-2 arrow-right font-bold">
            <strong>Step 3:</strong> Extract & Save Template
          </Typography>
        </Breadcrumbs>
      ) : (
        <Breadcrumbs aria-label="breadcrumb" style={{ marginLeft: "5px", padding: "5px" }} className="card ">
          <Typography color="text.primary" className="text-light bg-success p-1 pr-2 arrow-right font-bold">
            <strong>Step 1:</strong> Template Configuration
          </Typography>
          <Typography color="text.primary" className="text-light bg-info p-1 pr-2 arrow-right font-bold">
            <strong>Step 2:</strong> Upload Template Documents
          </Typography>
          <Typography color="text.primary" >
            <strong>Step 3:</strong> Extract & Save Template
          </Typography>
        </Breadcrumbs>
      )}
      <a href="/app/dashboard" id="dashboard" hidden>Bootstrap is life </a>
      <Card className={(classes.root)}>

        {imagelist.length > 0 ? (
          <div style={{ width: '150%', marginTop: "20px" }}>
            <Box margintop='10px' overflow="scroll" style={{ height: "450px", overflowX: "hidden" }}>
              <Typography>Fields Created: <img src={help_icon} alt="help_icon" title='Help' className='help-icon' onClick={helperOpen} /></Typography>
              <Table>
                {props.details.map((field, key) => {
                  return (<TableRow>
                    <TableCell>
                      <TextField
                        style={{ flex: 1, margin: '0 20px 0 0', background: 'white' }}
                        required
                        id="outlined-required"
                        name="fieldname"
                        label="Field Name"
                        value={field.fieldname}
                        variant="outlined"
                        size='small'
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        style={{ flex: 1, margin: '0 20px 0 0', background: 'white' }}
                        required
                        id="outlined-required"
                        name="Datatype"
                        label="Datatype"
                        value={props.datatype[field.type]}
                        variant="outlined"
                        size='small'
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        style={{ flex: 1, margin: '0 20px 0 0', background: 'white' }}
                        required
                        id="outlined-required"
                        name="Mandatory"
                        label="Mandatory"
                        value={props.mandatory[field.mandatory]}
                        variant="outlined"
                        size='small'
                      />
                    </TableCell>
                    <TableCell>
                      {/* {console.log(extract)}
                      {console.log(JSON.parse(extract[field.fieldname]))} */}
                      {extract[field.fieldname] && (
                        // <div>{extract[field.fieldname].map(x => JSON.parse(x.replaceAll("'", '"'))['text'])}</div>
                        <TextareaAutosize
                          style={{ flex: 1, margin: '0 20px 0 0', background: 'white' }}
                          aria-label="minimum height"
                          variant="outlined"
                          rowsMin={3}
                          rowsMax={10}
                          placeholder="Select and Click Extract"
                          value={extract[field.fieldname].map(x => JSON.parse(x.replaceAll("'", '"'))['text']).join(' ')}
                        // disabled
                        />
                      )}
                    </TableCell>
                  </TableRow>)
                })
                }
              </Table>
            </Box>
            <br></br>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              // endIcon={<ArrowForwardIcon/>}
              // href='/'
              onClick={savemodel}
              type="submit"
            >
              Save Template
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              // endIcon={<ArrowForwardIcon/>}
              // href='/'
              onClick={resetextract}
              type="submit"
            >
              Reset Extract
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              // endIcon={<ArrowForwardIcon/>}
              // href='/'
              onClick={coordinateExtract}
              type="submit"
            >
              Extract Text
            </Button>

            <br /><br /><br />
            {fielderror !== '' ?
              <Alert severity="error">{fielderror}</Alert> : <div></div>}

          </div>
        ) : (
          <React.Fragment>
            <div className='img-bg-fluid' > {/**style={classes.bgImg} */}
              <div className={classes.upload}> {/**className={classes.upload} */}
                {(errorUpload) && (<p className='text-danger font-italic '>Uploading faild, please try again...</p>)}

                {/* <Button
                variant="contained"
                component="label"
                className={classes.button1}
              >
                Upload File
                <input
                  type="file"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Button>
              <Button className={classes.button} id="icon-button-file" type="file" style={{ marginLeft: "10px", marginTop: '30px' }}
                onChange={(e) => setImage(e.target.files[0])} />
              <label htmlFor="icon-button-file">

              </label>
              <Button
                color="primary"
                onClick={saveDoc}
                className={buttonClassname}
                disabled={loading}
              >
                Submit
              </Button>
              {loading && (
                <CircularProgress size={48} className={classes.buttonProgress} />
              )} */}
                <DropzoneArea
                  acceptedFiles={['.pdf']}
                  maxWidth="sm"
                  multiple={false}
                  filesLimit={1}
                  // onChange={(files) => console.log('Files:', files)}
                  padding="5px"
                  showFileNames={true}
                  dropzoneText={"Drag and drop an PDF file or click"}
                  useChipsForPreview={true}
                  previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
                  onChange={(files) => setImage(files[0])}

                // previewChipProps={{ classes: { root: { minWidth: 160, maxWidth: 210 } } }}
                // previewText="Selected files"
                />
                <Button
                  color="primary"
                  onClick={saveDoc}
                  variant="contained"
                  className={buttonClassname + " mt-3 float-endo"}
                  align="right"
                // disabled={loading}
                >
                  Submit
                </Button>
              </div>
            </div>

            <Dialog
              open={showModel}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title" className='bg-dark-green text-light'>
                {"Step2: Upload Templete "}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <div className='row'>
                    <div className='col-10'>
                      Uploading file...
                      <strong>Processing to <mark className='fw-bold'>Step 3 Extract & Save Template.</mark> </strong>
                    </div>
                    <div className='col-2'>
                      <CircularProgress /><br />
                    </div>
                  </div>
                </DialogContentText>
              </DialogContent>
            </Dialog>

          </React.Fragment>)}
        {imagelist.length > 0 ? (
          <div className={classes.details}>
            <CardContent className={classes.content}>
              {console.log('page', regions)}
              <RegionSelect
                // maxRegions={props.details.length}
                maxRegions={calculateMaxRegions()}
                regions={regions[page]}
                regionStyle={{ background: 'rgba(121, 219, 91, 0.5)' }}
                onChange={onChange}
                style={{ color: 'red' }}
                regionRenderer={regionRenderer}
              >{console.log('maxregion', calculateMaxRegions(), 'Regions', regions)}
                <img src={imagelist[page - 1]} width='600px' height='750px' />
              </RegionSelect>
              <Pagination count={totalpage} showFirstButton showLastButton color="primary" onChange={handleChange} />
            </CardContent>



          </div>
        ) : <div></div>}
        <Snackbar open={open} autoHideDuration={5000}>
          <Alert severity="success">
            Template Saved successfully!!!
          </Alert>
        </Snackbar>
      </Card>
      <Dialog
        open={helpModel}
        onClose={helperClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="customized-dialog-title" className="model-headero">
          <div className='flexo-line'>
            <h4>Follow the Steps for Extraction </h4>
            <button className='btn-closeo ' onClick={helperClose}> <CloseIcon /> </button>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <strong className='mb-2'>For extracting the data from image, follow :</strong>
            <ol style={{ marginLeft: "2em" }}>
              <li>
                Click and drag the paticular content for keying the data from image <br />
                <img src={selt2_icon} alt="how_select" />
              </li>
              <li>
                On selecting particular value from selection box, that will asign to particualr fields <br />
                <img src={selt1_icon} alt="selection_content" />
              </li>
              <li>
                Once all the selection is completed, we can save the template from clicking the <code>SAVE TEMPLATE</code><br />
                <img src={saveTemp_icon} alt="save template" />
              </li>
              <li>
                If we want to reset all extracted values. Click on <code>RESET EXTRACT</code><br />
                <img src={resetExt_icon} alt="reset extract" />
              </li>
              <li>
                If any value want to re-select or delete, we can select particualr content from image and click on delete button<br />
                <img src={deleteField_icon} alt="delete_field" />
              </li>
              <li>
                For re-keying, once particualr field is deleted then re-key the value from selection box.
              </li>
            </ol>
          </Typography>
        </DialogContent>
      </Dialog>
    </div>
  )

}


export default ModelIntegration;