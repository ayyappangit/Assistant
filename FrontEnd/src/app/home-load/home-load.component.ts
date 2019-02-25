import { AddCardComponent } from './../cards/add-card/add-card.component';
import { Component, OnInit, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map, audit } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

import {
  faEllipsisV,
  faEllipsisH,
  faPlus,
  faGlobe,
  faUserPlus,
  faChartPie
} from "@fortawesome/free-solid-svg-icons";

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AstMemoryEfficientTransformer } from '@angular/compiler';
import { AnonymousSubject } from 'rxjs/internal/Subject';

// #region Interface

export interface AddUserToTeamDialogData {
  au_TeamName: string;
  au_UserName: string;
  au_Email: string;
}

export interface CreateTeamDialogData {
  ct_TeamName: string;
}

export interface CreateBoardDialogData {
  cb_TeamName: string;
  cb_BoardName: string;
}

export interface CreateListDialogData {
  cl_BoardName: string;
  cl_ListName: string;
}

export interface DisplayChartData {
  chartLabels: string[];
  chartData: string[];
  chart_Type_Pie: string;
  chart_Type_Doughnut: string;
  chart_Type_Polar: string;
  chart_Options: string[];
}

export interface UpdateCardDialogData {
  cu_Title: string;
  cu_Details: string;
  cu_DueDate: string;
  cu_Sequence: number;
}

//#endregion

@Component({
  selector: "app-home",
  templateUrl: "./home-load.component.html",
  styleUrls: ["./home-load.component.css"]
})
export class HomeLoadComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private httpClient: HttpClient
  ) { }

  editCardTextValue: string;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  //#region - Variable

  Uid = 1;
  getUserInfo: any;
  g_currUserName: any;
  g_currUserEmail: any;
  //rootURL = "http://localhost:3000/assistant/";
  rootURL = "https://infiniteassistantnode.azurewebsites.net/assistant/";
  faEllipsisV = faEllipsisV;
  faEllipsisH = faEllipsisH;
  faGlobe = faGlobe;
  faPlus = faPlus;
  faUserPlus = faUserPlus;
  faChartPie = faChartPie;

  cb_TeamName: string;
  cb_BoardName: string;

  cl_BoardName: string;
  cl_ListName: string;

  ct_TeamName: string;

  cu_Title: string;
  cu_Details: string;
  cu_DueDate: string;
  cu_Sequence: number;

  chartLabels: string[];
  chartData: string[];
  chart_Type_Pie: string;
  chart_Type_Doughnut: string;
  chart_Type_Polar: string;
  chart_Options: string[];

  au_TeamName: string;
  au_UserName: string;
  au_Email: string;

  g_CurrentTeamID: any;
  g_CurrentBoardID: any;
  g_CurrentListID: any;

  g_CurrentTeamName: any;
  g_CurrentBoardName: any;

  dialogUserInfo: any;

  // Teams Data
  getTeamsNav: any;

  // Get Boards
  getBoardsNav: any;

  // Get list
  getListsdata: any;

  // Get list-Cards
  getListsCardsdata: any;
  getUniqueCards: any;

  statuses: any[];

  // Change Card Title
  jsonChangeTitle: any;
  putCardTitleRes: any;

  // Update Severity
  jsonChangeSeverity: any;
  putSeverityRes: any;

  // Update Status
  jsonChangeStatus: any;
  putStatusRes: any;

  // Create board
  dialogBoardName: any;
  jsonCreateBoard: any;
  postBoardRes: any;

  // Create Team
  dialogTeamName: any;
  jsonCreateTeam: any;
  postTeamRes: any;

  // Create List
  dialogListName: any;
  jsonCreateList: any;
  postListRes: any;

  // Create Card
  jsonCreateCard: any;
  postCardRes: any;

  // Delete ToDo

  jsonDeleteCard: any;
  deleteCardURL: any;
  deleteCardRes: any;

  ProgressBar: any;

  //#endregion

  ngOnInit() {
    this.ProgressBar = "query";
    //if (window.location.origin.toString().indexOf('localhost') >= 0)
    //this.rootURL = "http://localhost:3000/assistant/";
    //else if (window.location.origin.toString().indexOf('infiniteassistantnode') >= 0)
    //this.rootURL = "https://infiniteassistantnode.azurewebsites.net/assistant/";
    this.getUser();
  }

  //#region OnInit

  // Load User
  getUser(): void {
    this.getUserService().subscribe(getUserInfo => {
      if (getUserInfo.length > 0) {
        this.g_currUserName = getUserInfo[0].UserName;
        this.g_currUserEmail = getUserInfo[0].Email;
        this.getTeams();
      } else {
        alert("Welcome to Assitant, Please signup to access the software.");
      }
    });
  }
  getUserService() {
    var _url = this.rootURL + "user/" + this.Uid;
    return this.http.get<any[]>(_url).pipe(map(data => data));
  }

  // Load Teams
  getTeams(): void {
    this.getTeamService().subscribe(getTeamsNav => {
      if (getTeamsNav.length > 0) {
        this.getTeamsNav = getTeamsNav;
        this.g_CurrentTeamID = getTeamsNav[0].TeamID;
        this.g_CurrentTeamName = getTeamsNav[0].TeamName;
        document.getElementById("hcurrentTeamID").title = this.g_CurrentTeamID;
        this.getBoards();
      } else {
      }
    });
  }
  getTeamService() {
    var _url = this.rootURL + "teams/" + this.Uid;
    return this.http.get<any[]>(_url).pipe(map(data => data));
  }

  // Load Boards
  getBoards(): void {
    this.getBoardService().subscribe(getBoardsNav => {
      if (getBoardsNav.length > 0) {
        this.getBoardsNav = getBoardsNav;
        this.g_CurrentBoardID = getBoardsNav[0].BoardID;
        this.g_CurrentBoardName = getBoardsNav[0].BoardName;
        document.getElementById(
          "hcurrentBoardID"
        ).title = this.g_CurrentBoardID;
        this.getListCard();
      } else {
        this.getUniqueCards = [];
        this.getBoardsNav = [];
      }
    });
  }
  getBoardService() {
    var _url = this.rootURL + "boards/" + this.g_CurrentTeamID;
    return this.http.get<any[]>(_url).pipe(map(data => data));
  }

  //Get Lists-Cards
  getListCard() {
    this.getListCardService().subscribe(getListsCardsdata => {
      this.getListsCardsdata = getListsCardsdata;
      //Get Unique List from List array
      this.getUniqueCards = [];
      const map = new Map();
      for (const item of this.getListsCardsdata) {
        if (!map.has(item.ListID)) {
          map.set(item.ListID, true);
          this.getUniqueCards.push({
            ListID: item.ListID,
            ListName: item.ListName
          });
        }
        if (!map.has(item.DueDate)) {
          if (item.DueDate != null)
            item.DueDate = new Date(item.DueDate.substring(0, 10));
        }
      }
      if (this.getUniqueCards.length !== 0) {
        document.getElementById(
          "hcurrentListID"
        ).title = this.getUniqueCards[0].ListID;
      }
      this.ProgressBar = "";
    });

  }
  getListCardService() {
    var _url = this.rootURL + "listscards/" + this.g_CurrentBoardID;
    return this.http.get<any[]>(_url).pipe(map(data => data));
  }

  event_getAllCardNew(listId) {
    return this.getListsCardsdata.filter(
      cards => cards.ListID === listId && cards.Active === true
    );
  }

  event_GetDueDateCSS(duedate: Date) {
    let css = 'Green';
    // var todayDate = new Date();
    // todayDate.setHours(12, 0, 0, 0);

    // todayDate.setHours(12, 0, 0, 0);
    // duedate.setHours(12, 0, 0, 0);
    // duedate.setDate(duedate.getDate() + 1); // Todo need to change the code to get utc time to calulate
    // if (duedate >= todayDate) {
    //   css = 'Green';
    // }
    return css;

  }

  //#endregion

  //#region Not in USE

  //Get Lists
  // getList() {
  //   this.getListsURL = this.rootURL + "lists/" + this.g_CurrentBoardID;
  //   this.getListService(this.getListsURL).subscribe(getListsdata => {
  //     this.getListsdata = getListsdata;
  //   });
  //   return this.getListsdata;
  // }
  // getListService(url: string) {
  //   return this.http.get<any[]>(url).pipe(map(data => data));
  // }

  //Get Cards - Not in use
  // getAllCard(listID: string) {
  //   var cardData;
  //   var url = this.rootURL + "cards/" + listID;
  //   this.getAllCardService(url).subscribe(_getCards => {
  //     cardData = _getCards;
  //   });
  //   return cardData;
  // }
  // getAllCardService(url: string) {
  //   return this.http.get<any[]>(url).pipe(map(data => data));
  // }

  //#endregion

  //#region  Events

  event_onTeamChange(event) {
    this.ProgressBar = "query";
    const target = event.target || event.srcElement || event.currentTarget;
    let teamID = target.attributes.id.nodeValue;
    teamID = teamID.replace("T", "");
    document.getElementById("hcurrentTeamID").title = teamID;
    this.g_CurrentTeamID = teamID;
    this.g_CurrentTeamName = target.innerHTML;
    this.getBoards();
  }

  event_onBoardChange(event) {
    this.ProgressBar = "query";
    const target = event.target || event.srcElement || event.currentTarget;
    let boardID = target.attributes.id.nodeValue;
    boardID = boardID.replace("B", "");
    document.getElementById("hcurrentBoardID").title = boardID;
    this.g_CurrentBoardID = boardID;
    this.g_CurrentBoardName = target.innerHTML;
    this.getListCard();
  }

  //#endregion

  //#region Create Team
  click_openDialogCreateTeam(): void {
    const dialogRef = this.dialog.open(DialogCreateTeam, {
      width: "290px",
      data: { ct_TeamName: this.ct_TeamName }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ct_TeamName = result;
      this.dialogTeamName = result;
      if (result != undefined) {
        this.createTeam();
      }
    });
  }

  createTeam() {
    // alert("Please buy premium Assistant to create new team!");
    this.jsonCreateTeam = {
      TeamName: this.dialogTeamName,
      UserInfoID: this.Uid
    };
    this.insertTeam();
  }

  insertTeam(): void {
    this.insertTeamService().subscribe(postTeamRes => {
      this.postTeamRes = postTeamRes;
      const res = JSON.parse(this.postTeamRes);
      if (res.status === 200) {
        this.toastr.success("Team creared!!");
        this.getTeams();
      }
    });
  }

  insertTeamService() {
    var _url = this.rootURL + "cteam";
    return this.http.post(
      _url,
      JSON.stringify(this.jsonCreateTeam),
      this.httpOptions
    );
  }

  //#endregion

  //#region Add User to the Board
  click_openDialogAddUserToTeam(): void {
    const dialogRef = this.dialog.open(DialogAddUserToTeam, {
      width: "290px",
      data: {
        au_TeamName: this.g_CurrentTeamName,
        au_Email: this.au_Email,
        au_UserName: this.au_UserName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogUserInfo = result;
      if (result != undefined) {
        //this.createBoard();
        alert("Still think add user to the team. AD or Just Email");
      }
    });
  }
  //#endregion

  //#region Create Board

  click_openDialogCreateBoard(): void {
    const dialogRef = this.dialog.open(DialogCreateBoard, {
      width: "290px",
      data: {
        cb_BoardName: this.cb_BoardName,
        cb_TeamName: this.g_CurrentTeamName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogBoardName = result;
      if (result != undefined) {
        this.createBoard();
      }
    });
  }

  createBoard() {
    this.jsonCreateBoard = {
      BoardName: this.dialogBoardName,
      TeamID: this.g_CurrentTeamID
    };
    this.insertBoard();
  }

  insertBoard(): void {
    this.insertBoardService().subscribe(postBoardRes => {
      this.postBoardRes = postBoardRes;
      const res = JSON.parse(this.postBoardRes);
      if (res.status === 200) {
        this.toastr.success("Board creared!!");
        this.getBoards();
      }
    });
  }

  insertBoardService() {
    var _url = this.rootURL + "cboard";
    return this.http.post(
      _url,
      JSON.stringify(this.jsonCreateBoard),
      this.httpOptions
    );
  }

  //#endregion

  //#region Chart

  click_openDialogDialogChart(): void {
    var _green = this.getListsCardsdata.filter(
      cards => cards.Severity === "success" && cards.Active === true
    ).length;
    var _red = this.getListsCardsdata.filter(
      cards => cards.Severity === "danger" && cards.Active === true
    ).length;
    var title = "app";
    var barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      tooltips: {
        mode: "nearest"
      }
    };
    const dialogRef = this.dialog.open(DialogPieChart, {
      width: "590px",
      data: {
        chartLabels: ["Red", "Green"],
        chartData: [_red, _green],
        chart_Type_Doughnut: "doughnut",
        chart_Type_Pie: "pie",
        chart_Type_Polar: "polarArea",
        chart_Options: barChartOptions
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dialogListName = result;
      if (result != undefined) {
        this.createList();
      }
    });
  }

  //#endregion

  //#region Create List

  click_openDialogCreateList(): void {
    const dialogRef = this.dialog.open(DialogCreateList, {
      width: "290px",
      data: {
        cl_ListName: this.cl_ListName,
        cl_BoardName: this.g_CurrentBoardName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogListName = result;
      if (result != undefined) {
        this.createList();
      }
    });
  }

  createList() {
    this.jsonCreateList = {
      ListName: this.dialogListName,
      BoardID: this.g_CurrentBoardID
    };
    this.insertList();
    //document.getElementById("divCreateList").className = "hideItem";
  }

  insertList(): void {
    this.insertListService().subscribe(postListRes => {
      this.postListRes = postListRes;
      const res = JSON.parse(this.postListRes);
      if (res.status === 200) {
        this.toastr.success("List creared!!");
        this.getListCard();
      }
    });
  }

  insertListService() {
    var _url = this.rootURL + "clist";
    return this.http.post(
      _url,
      JSON.stringify(this.jsonCreateList),
      this.httpOptions
    );
  }

  //#endregion

  //#region Update Card
  event_doubleClickCardTitle(card) {
    var viewcardText = document.getElementById("cardviewmode" + card.CardID);
    var editcardText = document.getElementById("cardeditmode" + card.CardID);
    this.editCardTextValue = viewcardText.innerText;
    console.log(this.editCardTextValue);
    viewcardText.className = "hideItem";
    editcardText.className = "showItem";
    document.getElementById("cardeditmode" + card.CardID).focus();

  }
  // event_enterEditCard(card) {
  //   const viewcardText = document.getElementById("cardviewmode" + card.CardID);
  //   const editcardText = document.getElementById("cardeditmode" + card.CardID);
  //   viewcardText.className = "showItem";
  //   editcardText.className = "hideItem";
  //   this.jsonChangeTitle = {
  //     CardID: card.CardID,
  //     Title: this.editCardTextValue
  //   };
  //   this.putUpdateCardTitle();
  //   console.log(this.editCardTextValue);
  // }

  event_blurEditCard(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    var _cardID = target.attributes.id.nodeValue;
    _cardID = _cardID.replace("cardeditmode", "");
    const viewcardText = document.getElementById("cardviewmode" + _cardID);
    const editcardText = document.getElementById("cardeditmode" + _cardID);
    viewcardText.className = "showItem";
    editcardText.className = "hideItem";
    this.jsonChangeTitle = {
      CardID: _cardID,
      Title: this.editCardTextValue
    };
    console.log(this.editCardTextValue);
    this.editCardTextValue = ""
    this.putUpdateCardTitle();
  }

  putUpdateCardTitle(): void {
    this.serviceputUpdateCardTitle().subscribe(putCardTitleRes => {
      this.putCardTitleRes = putCardTitleRes;
      const res = JSON.parse(this.putCardTitleRes);
      if (res.status === 200) {
        this.getListCard();
        // this.toastr.success("Card Updated!!");
      }
    });
  }
  serviceputUpdateCardTitle() {
    var _url = this.rootURL + "ucardTitle";
    return this.http.put(_url, JSON.stringify(this.jsonChangeTitle), this.httpOptions);
  }
  //#endregion

  //#region Create Card

  onCardCreated(formData: { title: string }) {
    this.jsonCreateCard = {
      Title: formData.title,
      ListID: document.getElementById("hcurrentListID").title
    };
    this.insertCard();
  }

  insertCard(): void {
    this.insertCardService().subscribe(postCardRes => {
      this.postCardRes = postCardRes;
      const res = JSON.parse(this.postCardRes);
      if (res.status === 200) {
        this.toastr.success("Card created!!");
        this.getListCard();
      }
    });
  }

  insertCardService() {
    var _url = this.rootURL + "ccard";
    return this.http.post(
      _url,
      JSON.stringify(this.jsonCreateCard),
      this.httpOptions
    );
  }

  //#endregion

  //#region Update Card
  event_UpdateCard(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    let id = target.attributes.id.nodeValue;
    id = id.replace("UpdateID", "");

    var _card = this.getListsCardsdata.filter(
      cards => cards.CardID === Number(id));
    const dialogRef = this.dialog.open(DialogCardUpdate, {
      width: "300px",
      data: {
        cu_ID: id,
        cu_Title: _card[0].Title,
        cu_Details: _card[0].Details,
        cu_DueDate: _card[0].DueDate,
        cu_Sequence: _card[0].Sequence,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dialogListName = result;
      if (result != undefined) {
        //sthis.createList();
      }
    });
  }
  //#endregion

  //#region Delete Card

  event_deleteCard(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    let id = target.attributes.id.nodeValue;
    id = id.replace("DeleteID", "");
    this.deleteCardURL = this.rootURL + "dcard/" + id;
    this.deleteCard();
  }

  deleteCard(): void {
    this.servicedeleteCard().subscribe(deleteCardRes => {
      this.deleteCardRes = deleteCardRes;
      const res = JSON.parse(this.deleteCardRes);
      if (res.status === 200) {
        this.getListCard();
        this.toastr.success("Card Deleted!!");
      }
    });
  }
  servicedeleteCard() {
    return this.http.put(this.deleteCardURL, this.httpOptions);
  }

  //#endregion

  //#region Change Severity
  event_changeCardSeverity(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    var _cardID = target.attributes.id.nodeValue;
    _cardID = _cardID.replace("ColorID", "");
    var _severityColor: string;
    const _severity = target.title;
    _severityColor = _severity === "Green" ? "success" : "danger";
    this.jsonChangeSeverity = {
      CardID: _cardID,
      Severity: _severityColor
    };
    this.putUpdateSeverity();
  }


  putUpdateSeverity(): void {
    this.serviceUpdateSeverity().subscribe(putSeverityRes => {
      this.putSeverityRes = putSeverityRes;
      const res = JSON.parse(this.putSeverityRes);
      if (res.status === 200) {
        this.getListCard();
        this.toastr.success("Card Severity Changed!!");
      }
    });
  }
  serviceUpdateSeverity() {
    var _url = this.rootURL + "ucardseverity";
    return this.http.put(
      _url,
      JSON.stringify(this.jsonChangeSeverity),
      this.httpOptions
    );
  }

  //#endregion

  //#region DND Change Status

  allowDrop(ev) {
    ev.preventDefault();
  }

  drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
  }

  drop(ev, dropContainerID: number) {
    ev.preventDefault();
    var cardID = ev.dataTransfer.getData("id");
    if (cardID != "") {
      cardID = cardID.replace("C", "");
      this.jsonChangeStatus = {
        CardID: cardID,
        ListID: dropContainerID
      };
      this.putUpdateStatus();
    }
  }

  putUpdateStatus(): void {
    this.serverUpdateStaus().subscribe(putStatusRes => {
      this.putStatusRes = putStatusRes;
      const res = JSON.parse(this.putStatusRes);
      if (res.status === 200) {
        this.getListCard();
        this.toastr.success("Card Status Changed!!");
      }
    });
  }

  serverUpdateStaus() {
    return this.http.put(
      this.rootURL + "ucardstatus/",
      JSON.stringify(this.jsonChangeStatus),
      this.httpOptions
    );
  }
  //#endregion
}

//#region - Dialog Components

@Component({
  selector: "dialog_AddUserToTeam",
  templateUrl: "dialog_AddUserToTeam.html"
})
export class DialogAddUserToTeam {
  constructor(
    public dialogRef: MatDialogRef<DialogAddUserToTeam>,
    @Inject(MAT_DIALOG_DATA) public data: AddUserToTeamDialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "dialog_CreateTeam",
  templateUrl: "dialog_CreateTeam.html"
})
export class DialogCreateTeam {
  constructor(
    public dialogRef: MatDialogRef<DialogCreateTeam>,
    @Inject(MAT_DIALOG_DATA) public data: CreateTeamDialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "dialog_CreateBoard",
  templateUrl: "dialog_CreateBoard.html"
})
export class DialogCreateBoard {
  constructor(
    public dialogRef: MatDialogRef<DialogCreateBoard>,
    @Inject(MAT_DIALOG_DATA) public data: CreateBoardDialogData
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "dialog_CreateList",
  templateUrl: "dialog_CreateList.html"
})
export class DialogCreateList {
  constructor(
    public dialogRef: MatDialogRef<DialogCreateList>,
    @Inject(MAT_DIALOG_DATA) public data: CreateListDialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: "dialog_PieChart",
  templateUrl: "dialog_PieChart.html"
})
export class DialogPieChart {
  constructor(
    public dialogRef: MatDialogRef<DialogPieChart>,
    @Inject(MAT_DIALOG_DATA) public data: DisplayChartData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // events on slice click
  public chartClicked(e: any): void {
    // console.log(e);
  }

  // event on pie chart slice hover
  public chartHovered(e: any): void {
    // console.log(e);
  }
}

@Component({
  selector: "dialog_UpdateCard",
  templateUrl: "dialog_UpdateCard.html"
})
export class DialogCardUpdate {
  constructor(
    public dialogRef: MatDialogRef<DialogCardUpdate>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateCardDialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
//#endregion
