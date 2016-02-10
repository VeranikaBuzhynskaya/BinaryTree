'use strict';

class BinaryTree {

	constructor() {
		this.root = null;
	}

	insert(data) {

		var root = this.root;
        // Если дерево пустое, то создаём корневой узел
		if(!root){
			this.root = new Node(data);
			return;
		}
		var current = root;
		var node = new Node(data);
		// Выполняется до тех пор, пока есть узлы (пока не доберётся до листьев)
		while (current !== null){
			// Если вставляемое значение меньше значения текущего узла
			if(data < current.data){
				// Если нет левого поддерева, добавляем значение в левого ребёнка
				if(!current.left){
					current.left = node;
					break;
				}
				else{
					// в противном случае повторяем для левого поддерева
					current = current.left;
				}
			}
			// Если вставляемое значение больше значения текущего узла
			else if (data > current.data){
				// Если нет правого поддерева, добавляем значение в правого ребёнка
				if(!current.right){
					current.right = node;
					break;
				}
				else{
					// в противном случае повторяем для правого поддерева
					current = current.right;
				}
			}
            else{
                // если вставляемый значение равен значению в каком-нибудь узле, то элемент не вставляем
                break;
            }
		}

	}

	contains(data) {

		// Изначально предполагаем, что значение не найдено
		var find = false;
		var current = this.root;
		while(!find && current !== null){
			if (data < current.data){
				// Если искомое значение меньше текущего, то идЁм налево
				current = current.left;
			} else if (data > current.data){
				// Если искомое значение больше текущего, то идём направо
				current = current.right;
			} else {
				// Если искомое значение было найдено
				find = true;
			}
		}
		return find;
	}

	remove(data) {

		var current = this.root;
		var find = false;
		var parent = null;
		var childCount;
		var change;
		var changeParent;

		// Проверить есть ли данное значенени (которое необходимо удалить) в дереве
		while(!find && current !==null){
			if (data < current.data){
				// Если искомое значение меньше текущего, то идЁм налево
				parent = current;
				current = current.left;
			} else if (data > current.data){
				// Если искомое значение больше текущего, то идём направо
				parent = current;
				current = current.right;
			} else {
				find = true;
			}
		}
		// Если искомое значение было найдено
		if (find){
			//Необходимо выяснить сколько у удаляемого узла детей
			childCount = (current.left != null ? 1 : 0) + (current.right != null ? 1 : 0);
            // если удаляемый элемент корневой узел
			if (current == this.root){
				switch(childCount){
					// Если нет детей
					case 0:
						this.root = null;
						break;
					// Если есть один ребёнок
					case 1:
						if (current.right == null){
							this.root = current.left;
						}
						else{
							this.root = current.right;
						}
						break;
					// Если есть двое детей
					case 2:
						//  присваиваем заменяемому узлу левого ребёнка корневого узла
						change = this.root.left;
						// ищем самый правый узел в левой ветви
						while(change.right !== null){
							changeParent = change;
							change =change.right;
						}
						 // если это не первый узел слева
						if (changeParent !== null){
							//удаляемым новый(на который хотим заменить предыдущий) узел с его предыдущей позиции
							changeParent.right = change.left;
							// и присваеваем всех детей старого узла
							change.right = this.root.right;
							change.left = this.root.left;
						} else {
							change.right = this.root.right;
						}
                        // назначаем новый корень
						this.root = change;
						break;
				}
			} else{
				switch(childCount){
					case 0:
						// нет детей, просто удаляем элемент из родителя
						if(current.data < parent.data){
							// будь он меньше родителя
							parent.left = null;
						} else{
							// или больше
							parent.right = null;
						}
						break;
					case 1:
						//Если один ребёнок, то нужно просто изменить родителя
						if(current.data < parent.data){
							if (current.left == null){
								parent.left = current.right;
							}
							else{
								parent.left = current.left;
							}
						} else{
							if (current.left == null){
								parent.right = current.right;
							}
							else{
								parent.right = current.left;
							}
						}
						break;
					case 2:
						change = current.left;
                        // ищем самый правый узел в левой ветви
						while(change.right !== null){
							changeParent = change;
							change = change.right;
						}
                         // если это не первый узел слева
                        if (changeParent !== undefined){
                            // удаляемым новый(на который хотим заменить предыдущий) узел с его предыдущей позиции
							changeParent.right = change.left;
                            // и присваеваем всех детей старого узла
							change.right = current.right;
							change.left = current.left;
                        }
                        else {
							change.right = current.right;
                        }
						// размещаем замену в правильном порядке
						if (current.data < parent.data){
							parent.left = change;
						}else{
							parent.right = change;
						}
                        current = change;
						break;
				}
			}
		}
	}

	size(){
		function count(current) {
			if (current == null) return 0;
			return 1 + count(current.left) + count(current.right);
		}
		return count(this.root);
    }

	isEmpty(){

		if(this.root == null){
			return true;
		}
		else{
			return false;
		}

	}
}
