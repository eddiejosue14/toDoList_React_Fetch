import React, { useState, useEffect } from "react";

//create your first component
export function Home() {
	const [task, setTask] = useState([]);

	let url = "https://assets.breatheco.de/apis/fake/todos/user/eddiejosiue14";

	function getTodo()
	{
		fetch(url, 
		{
			method: "GET",
			
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				setTask(data); 
				console.log({ data });
				console.log(`data from get<todo`, data);
			})
			.catch(error => console.log("Error:", error.message));
	}
	function newTodo() 
	{
		let array = [];
		fetch(url, {
			method: "POST",
			body: JSON.stringify(array),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				console.log(`data from get<todo`, data);
				getTodo();
			})
			.catch(error => console.log("Error:", error.message));
	}

	function updateTodo(task) 
	{
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(task),
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				getTodo();
				alert(data.result);
			})
			.catch(error => console.log("Error:", error.message));
	}

	function deleteTodo() 
	{
		fetch(url, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		})
			.then(res => res.json())
			.then(data => {
				newTodo();
				alert(data.result);
			})
			.catch(error => console.log("Error:", error.message));
	}

	function addItem(e) 
	{
		if (e.key === "Enter" && e.target.value !== "") {
			console.log(`task`, task);
			let obj = { label: e.target.value, done: true };
			setTask(task.concat(obj));
			e.target.value = "";
		}
	}

	function deleteItem(index) 
	{
		if (index > -1) {
			const filterData = task.filter(item => item !== task[index]);
			setTask(filterData);
		}
	}

	useEffect(() => 
	{
		getTodo();
	}, []);

	return (
		<div className="container">
			<h1 className="title">To Do List</h1>
			<div className="inputValue">
				<input
					type="text"
					className="form-control" 
					aria-label="Sizing example input" 
					aria-describedby="inputGroup-sizing-default" 
					name="item"
					placeholder="Add the items here"
					onKeyPress={e => addItem(e)}></input>
				<div className="list">
					<ul className="list-group">
						{task.map((item, index) => 
						{
							return (
								<li
									key={index} 
									className=" list-group-item d-flex justify-content-between align-items-center"
									onClick={() => {
										deleteItem(index);
									}}>
									{item.label}
									<span>
										<i className="fas fa-trash"></i>
									</span>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<div className="row d-flex justify-content-center">
				<button
					type="button"
					className="btn btn-danger"
					onClick={() => 
						{
							deleteTodo();
					    }}>
					Delete List
				</button>
				<button
					type="button"
					className="btn btn-success"
					onClick={() => 
						{
							updateTodo(task);
					    }}>
					Update List
				</button>
			</div>

			<div className="counter">
				<p>{task.length} Cantidad de tareas</p>
			</div>
		</div>
	);
}
