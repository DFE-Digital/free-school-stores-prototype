const main = () => {
    const updateRegions = () => {
        const checkboxToAdd = "<div class=\"govuk-checkboxes__item\">\r\n <input class=\"govuk-checkboxes__input\" id=\"filter-la\" name=\"filter-la\" type=\"checkbox\" value=\"{VALUE}\"><label class=\"govuk-label govuk-checkboxes__label\" for=\"filter-la\">{VALUE}<\/label>\r\n \r\n <\/div>"
        const divider = "<div class=\"govuk-checkboxes__divider govuk-!-font-weight-bold\">{VALUE}<\/div>"
        const regions = {"East Midlands" : ["Derby","Derbyshire","Leicester","Leicestershire","Lincolnshire","Northamptonshire","Nottingham","Nottinghamshire","Rutland"],
        "East of England": ["Bedford","Cambridgeshire","Central Bedfordshire","Essex","Hertfordshire","Luton","Norfolk","Peterborough","Southend on Sea","Suffolk","Thurrock"],
        "London" : ["Barking and Dagenham","Barnet","Bexley","Birmingham","Brent","Bromley","Camden","City of London","Croydon","Ealing","Enfield","Greenwich","Hackney","Hammersmith and Fulham","Haringey","Harrow","Havering","Hillingdon","Hounslow","Islington","Kensington and Chelsea","Kingston upon Thames","Lambeth","Lewisham","Merton","Milton Keynes","Newham","Redbridge","Richmond upon Thames","Southwark","Sutton","Tower Hamlets","Waltham Forest","Wandsworth","Westminster"],
        "North East" : ["Bury","Darlington","Durham","Hartlepool","Knowsley","Middlesbrough","Newcastle upon Tyne","North Tyneside","Northumberland","South Tyneside","Stockton-on-Tees","Sunderland"],
        "North West" : ["Blackburn with Darwen", "Blackpool", "Bolton", "Bury", "Cheshire East", "Cheshire West and Chester", "Cumbria", "Halton", "Knowsley", "Lancashire", "Liverpool", "Manchester", "Oldham", "Rochdale", "Salford", "Sefton", "St Helens", "Stockport", "Tameside", "Trafford", "Warrington", "Wigan", "Wirral"],
        "South East" : ["Bracknell Forest","Brighton and Hove","Buckinghamshire","East Sussex","Hampshire","Isle of Wight","Kent","Medway","Milton Keynes","Oxfordshire","Portsmouth","Reading","Slough","Southampton","Surrey","West Berkshire","West Sussex","Windsor and Maidenhead","Wokingham"],
        "South West" : ["Barnsley","Bath and North East Somerset","Bournemouth","Bristol","Bury","Cornwall","Devon","Dorset","Gloucestershire","Hartlepool","North Somerset","Plymouth","Poole","Somerset","South Gloucestershire","Swindon","Torbay","Wiltshire"],
        "West Midlands" : ["Birmingham","Coventry","Dudley","Herefordshire","Sandwell","Shropshire","Solihull","Staffordshire","Stoke-on-Trent","Telford and Wrekin","Walsall","Warwickshire","Wolverhampton","Worcestershire"],
        "Yorkshire and the Humber" : ["Barnsley","Bradford","Calderdale","Doncaster","East Riding of Yorkshire","Kingston upon Hull","Kirklees","Leeds","North East Lincolnshire","North Lincolnshire","North Yorkshire","Rotherham","Sheffield","Wakefield","York"]}
    
        const LACheckboxes = document.getElementsByClassName('id-filter-la')[0]
        LACheckboxes.innerHTML = ""
    
        let counter = 0;
        
        document.getElementsByName('filter-regions').forEach((region) => 
        {
            if(region.checked)
            {
                const localAuthority = regions[region.value]
    
                LACheckboxes.innerHTML += divider.replaceAll("{VALUE}", region.value)
    
                if(localAuthority)
                {
                    let html = ""
                    html = localAuthority.map(x => checkboxToAdd.replaceAll("{VALUE}", x)).reduce((acc, next) => acc + next)
    
                    LACheckboxes.innerHTML += html
                }

                counter += localAuthority.length
            }
        })

        if(LACheckboxes.innerHTML === "")
        {
            LACheckboxes.innerHTML += divider.replaceAll("{VALUE}", "Please select a region")
        }
    }
    
    const addListener = (element) => {
        element.addEventListener('click', updateRegions)
    }

    document.getElementsByName('filter-regions').forEach(x => addListener(x))

    updateRegions()
}

main()
