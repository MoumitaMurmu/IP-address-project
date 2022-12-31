let MyipAddress = ""
$.getJSON("https://api.ipify.org?format=json", function (data) {
MyipAddress = data.ip
 $("#ip-Number").html(`MY Public IP ADDRESS: ${data.ip}`);
})
let pincode
let PostOfficeArray=[]
let PostOfficeArray2 = []
const form = document.getElementById("form")
const getData = async () => {
    try {
        const response = await fetch(`https://ipinfo.io/[${MyipAddress}]?token=6f4da8be59257f`)
        const data = await response.json()
        console.log(data);
        const [latitude, longitude] = data.loc.split(',')
        const city = data.city
        const org = data.org
        const region = data.region
        const timezone = data.timezone
        pincode = data.postal
        const map = document.getElementById("iframe")
        console.log(data.loc[1]);
        document.getElementById("lat").textContent = `Lat: ${latitude}`
        document.getElementById("long").textContent = `Long: ${longitude}`
        document.getElementById("city").textContent = `City: ${city}`
        document.getElementById("organisation").textContent = `Organisation: ${org}`
        document.getElementById("region").textContent = `Region: ${region}`
        document.getElementById("hostname").textContent = `Hostname: hostname`
        document.getElementById("time-zone").textContent = `Time Zone: ${timezone}`
        document.getElementById("pincode").textContent = `Pincode: ${pincode}`


        document.getElementById("iframe").style.display = 'block'
        map.src=`https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed`

        const date = new Date()
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(date)
        const dateTime = document.getElementById("dateTime")
        dateTime.textContent = `Date And Time: ${formattedDate}`

        const apiForPostal = async () => {
            const postalResponse = await fetch(`https://api.postalpincode.in/pincode/${pincode}`)
            const postalData = await postalResponse.json()

            let PostOfficeArray = postalData[0].PostOffice
            console.log(PostOfficeArray);

            let postOffices = document.getElementById("post-offices")
            PostOfficeArray.forEach((office) => {
                console.log(office.Name)
                const div = document.createElement('div')
                div.classList.add("postoffice-box")
                const officeName = document.createElement('p') 
                officeName.textContent = `Name: ${office.Name}`
                div.appendChild(officeName)

                const branchType = document.createElement('p')
                branchType.textContent = `BranchType: ${office.BranchType}`
                div.appendChild(branchType)

                const deliveryStatus = document.createElement('p')
                deliveryStatus.textContent = `DeliveryStatus: ${office.DeliveryStatus}`
                div.appendChild(deliveryStatus)

                const district = document.createElement('p')
                district.textContent = `District: ${office.District}`
                div.appendChild(district)

                const division = document.createElement('p')
                division.textContent = `Division: ${office.Division}`
                div.appendChild(division)



               
                postOffices.appendChild(div)
            });

            console.log(PostOfficeArray);
           
            const search = document.getElementById("searchButton")
            const searchValue = document.getElementById("search-term")
            PostOfficeArray.forEach((office)=>{
                search.addEventListener("click",()=>{
                    if(office.Name.includes(searchValue.value)||office.BranchType.includes(searchValue.value)){
                       
                        let results = document.getElementById("results")
                const div = document.createElement('div')
                div.classList.add("postoffice-box")
                const officeName = document.createElement('p') 
                officeName.textContent = `Name: ${office.Name}`
                div.appendChild(officeName)

                const branchType = document.createElement('p')
                branchType.textContent = `BranchType: ${office.BranchType}` 
                div.appendChild(branchType)

                const deliveryStatus = document.createElement('p')
                deliveryStatus.textContent = `DeliveryStatus: ${office.DeliveryStatus}` 
                div.appendChild(deliveryStatus)

                const district = document.createElement('p')
                district.textContent = `District: ${office.District}` 
                div.appendChild(district)

                const division = document.createElement('p')
                division.textContent = `Division: ${office.Division}` 
                div.appendChild(division)

                results.appendChild(div)
                document.getElementById("post-offices").style.display = 'none'
                    }
                    
                })
                
            })


        }
        apiForPostal()

        button.style.display = "none"
        form.style.display = "block"
    }
    catch (error) {
            console.log(error);
        }
    }
const button = document.getElementById("button")
    button.onclick = getData
        
        
    



