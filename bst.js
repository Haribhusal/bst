class Node{
  constructor(value){
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}
class balancedBST{
  constructor(){
    this.root = null;
  }
  getHeight(node){
    if(node === null) return 0;
    return node.height;
  }
  getBalanceFactor(node){
    if(node === null) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right);
  }
  updateHeight(node){
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }

  rightRotate(y){
    const x = y.left;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    this.updateHeight(y);
    this.updateHeight(x);
    return x;
  }
  leftRotate(x){
    const y = x.right;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    this.updateHeight(x);
    this.updateHeight(y);
    return y;
  }

  //insert a new node
  insert(value){
    this.root = this._insert(this.root, value);
  }

  _insert(node, value){
    if(node === null) return new Node(value);
    if(value < node.value) node.left = this._insert(node.left, value);
    else if(value > node.value) node.right = this._insert(node.right, value);
    else return node;

    this.updateHeight(node);

    const balanceFactor = this.getBalanceFactor(node);


    if(balanceFactor > 1 && value < node.left.value){
      return this.rightRotate(node);
    }
    if(balanceFactor < -1 && value > node.right.value){
      return this.leftRotate(node);
    }
    if(balanceFactor > 1 && value > node.left.value){
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }
    if(balanceFactor < -1 && value < node.right.value){
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }
    return node;
  }

  findMin(node){
    let current = node;
    while(current.left){
      current = current.left;
    }
    return current;

  }

  delete(value){
    this.root = this._delete(this.root, value);
  }
  _delete(node, value){
    if(node === null) return null;
    if(value < node.value) node.left = this._delete(node.left, value);
    else if(value > node.value) node.right = this._delete(node.right, value);
    else{
      if(!node.left){
        return node.right;
      }
      else if(!node.right){
        return node.left;
      }
      const minNode = this.findMin(node.right);
      node.value = minNode.value;
      node.right = this._delete(node.right, minNode.value);
    }
    if(!node) return null;
    this.updateHeight(node);
    const balance = this.getBalanceFactor(node);

    if(balance > 1 && this.getBalanceFactor(node.left) >= 0){
      return this.rightRotate(node); 
    }
    if(balance > 1 && this.getBalanceFactor(node.left) < 0){
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }
    if(balance < -1 && this.getBalanceFactor(node.right) <= 0){
      return this.leftRotate(node);
    }
    if(balance < -1 && this.getBalanceFactor(node.right) > 0){
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }
    return node;
  }


  update(oldValue, newValue){
    if(this.search(oldValue)){
    this.delete(oldValue);
    this.insert(newValue);
    return true;
   }
   return false;
  }

  search(value){
    return this._search(this.root, value);
  }

  _search(node, value){
    if(node === null || node.value === value) return node;
    if(value < node.value) return this._search(node.left, value);
    return this._search(node.right, value);
  }

  inOrderTraversal(){
   const result = [];
   this._inOrderTraversal(this.root, result);
   return result;
  }
  _inOrderTraversal(node, result){
    if(node){
      this._inOrderTraversal(node.left, result);
      result.push(node.value);
      this._inOrderTraversal(node.right, result);
    }
  }
}

// Test the implementation
const bst = new balancedBST();

// Insert nodes
console.log("Inserting nodes: 10, 20, 30, 40, 50, 25");
bst.insert(10);
bst.insert(20);
bst.insert(30);
bst.insert(40);
bst.insert(50);
bst.insert(25);

console.log("Inorder traversal after insertion:", bst.inOrderTraversal());

// Search for a value
console.log("Searching for value 30:", bst.search(30) ? "Found" : "Not found");
console.log("Searching for value 60:", bst.search(60) ? "Found" : "Not found");

// Update a value
console.log("Updating 30 to 35");
bst.update(30, 35);
console.log("Inorder traversal after update:", bst.inOrderTraversal());

// Delete nodes
console.log("Deleting node with value 20");
bst.delete(20);
console.log("Inorder traversal after deletion:", bst.inOrderTraversal());

// Try to update a non-existent value
console.log("Trying to update non-existent value 30 to 45:", 
  bst.update(30, 45) ? "Updated" : "Value not found");


// Thank you 