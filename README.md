# Random User App
### Outcome
![random-user](https://github.com/vildancetin/random-user/assets/75564722/94def24d-3890-415a-9c39-cb6ce73bd8a3)

This project utilizes an API to retrieve and display random user information. When a user hovers over the icons, the user's information is displayed on the screen. To achieve this, a function was created to fetch data using the fetch method. The data is of type object, and a state is established to handle this data. 
```javascript
const getUser = () => {
    try {
      fetch(url)
        .then((res) => {
          if(!res.ok){
            throw new Error("Something went wrong")
          }
          return res.json()
        })
        .then((data) => setUser(data.results[0]));
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };
```
Additionally, a loading GIF is incorporated to inform the user during page loading.

The info state is responsible for holding the icon data, including the data-label and name. This information is dynamically written to the DOM.
```javascript
  const handleIcon = (personInfo) => {
    setInfo(personInfo);
  };
onMouseEnter={(e) => handleIcon(e.target.dataset.label)}
```
#### Add User
To add user information, users can click the "Add" button. For this purpose, another state is created to store information in an array. The information is then saved to the local storage. If the local storage is not empty, a list is retrieved from it, and the additional section is updated accordingly.

```javascript
  const addUserToList = () => {
    if (user) {
      if (!addUserList.includes(user)) {
        setAddUserList([...addUserList, user]);
        localStorage.setItem("userlist",JSON.stringify(addUserList))
      }
      else{notify()}
    }};
```
##### Toast message
To handle the case of adding the same user again, react-toastify has been integrated. Upon attempting to add an existing user, a toast message is triggered, providing informative feedback to the user.
```javascript
  const notify=()=>toast.warn('You cannot add twice!', { position: "top-right", autoClose: 3000,hideProgressBar: false,closeOnClick: true,pauseOnHover: true,draggable: true,progress: undefined,theme: "colored",});
```
#### New User
To view new user information, users can click the "New User" button. This button triggers the getUser function, fetching and displaying new user information.
```javascript
<button className="btn" type="button" onClick={getUser}>new user</button>
```
### Live
[Live](https://random-user-vildan.netlify.app/)
