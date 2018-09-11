* App.js
  * setLogin
    * passed to EntryScreen as props
    - EntryScreen 
      * handleLoginPress takes props LoginScreen 
        - we have state with email and password 
          * handleChangeLogin setState 
          * handleChangePassword setState 
          * handleLoginPress  and props setLogin to true

      * handleSingupPress takes props SingnupScreen
        - we have state with email passwordConfirm and password
        * handleChangeLogin setState to value 
        * handleChangePassword setState to value 
        * handleChangePasswordConfirm setState to value 
      - handleLoginPress  update and check setLogin


  * getEvents if token correct grab all events 
    * passed props and navProps to Home ReviewScreen PastScreen AddScreen
    * Home 
      * doneeNote after gets finish invokes getEvents
      * deleteNote after gets finish invokes getEvents
      - return after gets finish invokes ReviewScreen 
    * ReviewScreen 
      * get event return event from navigation by id
      - we have state for update title date notes isEditing
        * handleChangeNote setState for value 
        * handleChangeTitle setState for value 
        * handleDatePicked setState for value 
        * handleDatePickerHide setState for value 
        * handleDatePress setState for value 
        * pressEdit setState for value 
    * PastScreen 
      
    * AddScreen 
