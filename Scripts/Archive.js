document.addEventListener('DOMContentLoaded', ()=>
	 fetch('Scripts/Data/Catalogue.json')
			.then(response=>response.json())
			.then(data=>{
				const fragment = document.createDocumentFragment();
				data.forEach(({Date, Info, Preview, Source, Title, Type, Download})=>{
					let IterativeElement = document.createElement('tr');
					IterativeElement.innerHTML = `
                    <td>
                        <div class='ArchiveTitle'>                              
                            <img src='${Preview}'>
                            <p>${Title}</p>
                        </div>
                    </td>
                    <th class='decor'></th>
                    <td>${Type}</td>
                    <th class='decor'></th>
                    <td><time>${Date}</time></td>
                    <th class='decor'></th>
                    <td><em>${Info}</em></td>
                    <th class='decor'></th>
                    <td>
                      <form class='ArchiveLinks' method='get' action='${Download}'>
                        <button type='button' onclick='window.open("${Source}")'>Open</button>
                        <button type='submit'>Download</button>
                      </form>
                    </td>
                `;
					fragment.appendChild(IterativeElement);
				});
				document.getElementById('Archive').appendChild(fragment);
			}).catch(error=>console.error('Error fetching Catalogue.json:', error))
);