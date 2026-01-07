let elSignInForm=document.querySelector('.signin-form')
let elNotification=document.querySelector('.notification-board')
let baseUrl='http://localhost:3000'

elSignInForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let data = {
        login: e.target.login.value,
        password: e.target.password.value
    }
    axios.get(`${baseUrl}/teachers?login=${data.login}&password=${data.password}`).then(res=>{
        if (res.data.length && res.data[0].login === data.login && res.data[0].password === data.password) {
               elNotification.classList.remove('hidden')
                elNotification.classList.add('block')
                elNotification.innerHTML = `
                <div class="absolute top-[30px] right-[50px] bg-green-200 px-6 py-4 rounded-md text-lg flex items-center max-w-lg">
                    <svg viewBox="0 0 24 24" class="text-green-600 w-5 h-5 mr-3">
                        <path fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12A12,12,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                        </path>
                    </svg>
                    <span class="text-green-800">Teacher logged in successfully</span>
                </div>`

                setTimeout(() => {
                    let teacher = res.data[0]
                    localStorage.setItem('teacher', JSON.stringify({ id: teacher?.id || '' }))
                    location.pathname = 'pages/user.html'
                }, 1500)
        }
        else{
               axios.get(`${baseUrl}/users?login=${data.login}&password=${data.password}`).then(res => {
            if (res.data.length && res.data[0].login === data.login && res.data[0].password === data.password) {
                elNotification.classList.remove('hidden')
                elNotification.classList.add('block')
                elNotification.innerHTML = `
                <div class="absolute top-[30px] right-[50px] bg-green-200 px-6 py-4 rounded-md text-lg flex items-center max-w-lg">
                    <svg viewBox="0 0 24 24" class="text-green-600 w-5 h-5 mr-3">
                        <path fill="currentColor"
                            d="M12,0A12,12,0,1,0,24,12A12,12,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
                        </path>
                    </svg>
                    <span class="text-green-800">User logged in successfully</span>
                </div>`

                setTimeout(() => {
                    let user = res.data[0]
                    localStorage.setItem('user', JSON.stringify({ id: user?.id || '' }))
                    location.pathname = 'pages/user.html'
                }, 1500)
            } else {
                elNotification.classList.remove('hidden')
                elNotification.classList.add('block')
                elNotification.innerHTML = `
                <div class="absolute top-[30px] right-[50px] bg-red-200 px-6 py-4 rounded-md text-lg flex items-center max-w-lg">
                    <svg viewBox="0 0 24 24" class="text-red-600 w-5 h-5 mr-3">
                        <path fill="currentColor"
                            d="M11.983,0A12.206,12.206,0,0,0,0,12.207A11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47a1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
                        </path>
                    </svg>
                    <span class="text-red-800">Invalid login or password</span>
                </div>`

                setTimeout(() => {
                    elNotification.classList.add('hidden')
                }, 3000)
            }
        })
        }
    })
 
})
