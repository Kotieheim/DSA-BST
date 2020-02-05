class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
  insert(key, value) {
    // If the tree is empty then this key being inserted is the root node of the tree
    if (this.key == null) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      /* If the tree already exists, then start at the root, 
       and compare it to the key you want to insert.
       If the new key is less than the node's key 
       then the new node needs to live in the left-hand branch */
      /* If the existing node does not have a left child, 
           meaning that if the `left` pointer is empty, 
           then we can just instantiate and insert the new node 
           as the left child of that node, passing `this` as the parent */
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      } else {
        /* If the node has an existing left child, 
           then we recursively call the `insert` method 
           so the node is added further down the tree */
        this.left.insert(key, value);
      }
    } else {
      /* Similarly, if the new key is greater than the node's key 
       then you do the same thing, but on the right-hand side */
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }
  find(key) {
    // If the item is found at the root then return that value
    if (this.key == key) {
      return this.value;
    }
    // If the item you are looking for is less than the root then follow the left child. If there is an existing left child, then recursively check its left and/or right child until you find the item.
    else if (key < this.key && this.key.left) {
      return this.left.find(key);
    }
    // If the item you are looking for is greater than the root then follow the right child. If there is an existing right child, then recursively check its left and/or right child until you find the item.
    else if (key > this.key && this.key.right) {
      return this.right.find(key);
    }
    // You have searched the tree and the item is not in the tree
    else {
      throw new Error("Key Error");
    }
  }
  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      // If the node only has a left child, then you replace the node with its left child.
      else if (this.left) {
        this._replaceWith(this.left);
      }
      // And similarly if the node only has a right child then you replace it with its right child.
      else if (this.right) {
        this._replaceWith(this.right);
      }
      // If the node has no children then simply remove it and any references to it by calling "this._replaceWith(null)"
      else {
        this._replaceWith(null);
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key);
    } else if (key > this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error("Key Error");
    }
  }
  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      } else if (this == this.parent.right) {
        this.parent.right = node;
      }
      if (node) {
        node.parent = this.parent;
      }
    } else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      } else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }
  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }
}

/* Given the data 3,1,4,6,9,2,5,7, draw the tree
          3
        /   \
       1     4
        \   / \ 
         2     6
              / \
             5   9
                /
               7


*/

/*
Draw the BST with the keys - E A S  Y  Q  U  E S  T  I O  N
                             5 1 19 25 17 21 5 19 20 9 15 14



                E 
              /   \
            A       S
          /   \   /   \ 
                 Q     Y
                /      /
               I      U 
                \
                 O
                /
               N

Deleteing all the roots would leave just N wouldn't it?
               
               
Not sure how to handle duplicates such as - E and S
*/

function main() {
  const BST = new BinarySearchTree();
  BST.insert(3);
  BST.insert(1);
  BST.insert(4);
  BST.insert(6);
  BST.insert(9);
  BST.insert(2);
  BST.insert(5);
  BST.insert(7);
  // it goes up to 6 on the right, but stops? missing 5, 9 and 7 at tree 6
  //   console.log(BST);
  const BST2 = new BinarySearchTree();
  BST2.insert("E");
  BST2.insert("A");
  BST2.insert("S");
  BST2.insert("Y");
  BST2.insert("Q");
  BST2.insert("U");
  BST2.insert("E");
  BST2.insert("S");
  BST2.insert("T");
  BST2.insert("I");
  BST2.insert("O");
  BST2.insert("N");

  console.log(BST2);
  // This builds how I expected, aside from the duplicates. It looks like equal value keys get rounded up and go to the right?
}

// looks like it travels the whole tree adding up all the values? Can't figure out how to insert the right values.

const berp = new BinarySearchTree();
berp.insert(3);
berp.insert(1);
berp.insert(4);
berp.insert(6);
berp.insert(9);
berp.insert(2);
berp.insert(5);
berp.insert(7);
function tree(t) {
  if (!t) {
    return 0;
  }
  console.log(t.value);
  return tree(t.left) + t.value + tree(t.right);
}
// console.log(tree(berp));

function height(tree) {
  if (!tree) {
    return 0;
  }
  let left = height(tree.left);
  let right = height(tree.right);
  console.log(left, right);
  return 1 + Math.max(left, right);
}
console.log(height(berp));

function isBST(tree) {
  if (!tree) {
    return false;
  } else if (tree.left > tree.right || tree.right < tree.left) {
    return false;
  } else if (!tree.key) {
    return false;
  }
  return true;
}
const notATree = "I'm an imposter";
const emptyBST = new BinarySearchTree();
console.log(isBST(berp), isBST(emptyBST), isBST(notATree));

let counter = {
  number: 0
};
function balanced(tree, counter) {
  if (tree.right) {
    counter.number++;
    balanced(tree.right, counter);
  }
  if (tree.left) {
    counter.number++;
    balanced(tree.left, counter);
  }
  if (counter.number < 0 || counter.number > 0) {
    return false;
  } else {
    return true;
  }
}
// IDK
const balancedTree = new BinarySearchTree();
balancedTree.insert(3);
balancedTree.insert(1);
balancedTree.insert(4);
// console.log(balanced(balancedTree, counter));

function matchBst(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  arr1.sort();
  arr2.sort();
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

console.log(matchBst([1, 2, 3, 4, 5, 6], [6, 2, 3, 1, 5, 4]));

main();
