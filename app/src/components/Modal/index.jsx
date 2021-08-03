import React from 'react'
import { StyledModal } from '../../styles/components/StyledModal'
import { FiX } from 'react-icons/fi'


const Modal = ({children, title, active=true, changeActive=()=>{}, buttons=[]})=>{

	function handleClose(event){
		event.preventDefault()

		changeActive(false)
	}

	return (
			active?
			<StyledModal>
				<div className="modal">
					<div className="title">
						{title}
						<button className="close" onClick={handleClose}>
							<FiX size={22}/>
						</button>
					</div>
					<div className="body">
						{children}
					</div>
					<div className="footer">
						{buttons.map((b, i)=>{
							return <button key={i} onClick={b.action} disabled={!b.active}>{b.active?b.title:'Loading...'}</button>
						})}
					</div>
				</div>
			</StyledModal>
			:
			<></>
	)
}


export {
	Modal
}