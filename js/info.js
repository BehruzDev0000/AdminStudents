let elUserProfile=document.querySelector('.user-profile')
let elUserCard=document.querySelector('.user-card')

let student=JSON.parse(localStorage.getItem('info'))
if(student){
     elUserProfile.classList.remove('hidden')
    elUserProfile.classList.add('block')
    elUserProfile.innerHTML=`
    <img src="${student.img}" class="w-28 h-28 rounded-full mb-5 object-cover" />
    <h3 class="font-bold text-[17px] text-black mb-[10px]">${student.name}</h3>
    <span class="font-medium text-[14px] text-[#FEAF00]">Student</span>
    `
    elUserCard.classList.add('inline-block')
    elUserCard.classList.remove('hidden')

    elUserCard.innerHTML=`
    <h1 class="font-bold text-[22px] text-black">${student.lastName}</h1>
    <hr class="w-full h-0 border-[1px] border-[#E5E5E5] mt-[21px] mb-[41px]" />
    <div class="flex items-start gap-[51px] pl-[25px] pr-[161px] pt-[28px] pb-[147px] relative bg-white">
    <img src="${student.img}" width="216" height="216" class="w-[206px] h-[216px] rounded-[4px]" />
    <div class="flex flex-col gap-[19px]">
        <div>
        <span class="text-[12px] font-semibold text-[#ACACAC]">Name</span>
        <p>${student.lastName}</p>
        </div>
        <div>
        <span class="text-[12px] font-semibold text-[#ACACAC]">Email</span>
        <p>${student.email}</p>
        </div>
        <div>
        <span class="text-[12px] font-semibold text-[#ACACAC]">Phone</span>
        <p>${student.phone}</p>
        </div>
        <div>
        <span class="text-[12px] font-semibold text-[#ACACAC]">Date Admission</span>
        <p>${student.date}</p>
        </div>
    </div>
    <img src="./../images/vector.svg" class="absolute top-[15px] right-[15px]" width="12" height="83"/>
    </div>
    
    `
}
function studentsRender(){
    window.location.pathname = 'pages/user.html'
}
