# API World Cup 22

## Description
Project of a Rest API in _node.js_, to answer information about World Cup 22, in relation to groups, teams and games

### 🛠 Technologies

The tools used in the project are:
- JavaScript
- [Node.js](https://node.js.org/en/)
- [MongoDB](https://www.mongodb.com)
---

## Documentation

### Group Routes
#### Returns a group

```http
  GET /get/group/${idGroup}
  Authorization: ${Token}
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `idGroup`   | `string`   | **Required**. ID of group you want |
| `Token`     | `string`    |   **Required**. Your account Token|
  ---
```http
  GET /get/group/?name=${nameGroup}
  Authorization: ${Token}
```

| Parameter | Type | Description|
|:--------- | :---- | :--------- |
| `nameGroup` | `string` | For search in database using group name instead of ID |
| `Token`     | `string`    |   **Required**. Your account Token|

#### Returns all groups

```http
  GET /get/groups/
  Authorization: ${Token}
```

| Parameter | Type | Description |
| :-------  | :--- | :---------- |
| `Token`     | `string`    |   **Required**. Your account Token|

### Team Routes
#### Returns a team

```http
  GET /get/team/${idTeam}
  Authorization: ${Token}
```

| Parameter | Type | Description |
| :-------  | :--- | :---------- |
| `idTeam` | `string` | **Required**. ID of team you want
| `Token`     | `string`    |   **Required**. Your account Token|
  ---
```http
  GET /get/team/?name=${nameTeam}
  Authorization: ${Token}
```

| Parameter | Type | Description|
|:--------- | :---- | :--------- |
| `nameTeam` | `string` | For search in database using group name instead of ID |
| `Token`     | `string`    |   **Required**. Your account Token|

#### Returns all teams
```http
  GET /get/teams
  Authorization: ${Token}
```
| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `Token`     | `string`    |   **Required**. Your account Token|

#### Returns all teams in a group
```http
  GET /get/teams/?group={groupName}
  Authorization: ${Token}
```
| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `groupName` | `string` | Name of the group from which you want the teams |
| `Token`     | `string`    |   **Required**. Your account Token|

### Game Routes
#### Returns a game
```http
  GET get/game/:${idGame}
  Authorization: ${Token}
```
| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `idGame` | `string` | **Required**. ID of game you want |
| `Token`     | `string`    |   **Required**. Your account Token|

#### Returns all game
```http
  GET /get/games/
  Authorization: ${Token}
```
| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `Token`     | `string`    |   **Required**. Your account Token|


### Author
---

<a href="https://github.com/jp2435">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/64277389?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Jorge CP</b></sub></a>🚀


Made with ❤️ by JP2435 👋🏼 Contact!

[![Twitter Badge](https://img.shields.io/badge/-@jorge_CP2435-1ca0f1?style=flat-square&labelColor=1ca0f1&logo=twitter&logoColor=white&link=https://twitter.com/jorge_CP2435)](https://twitter.com/jorge_CP2435)
[![Gmail Badge](https://img.shields.io/badge/-fuseta00@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:fuseta00@gmail.com)](mailto:fuseta00@gmail.com)