import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import { FontAwesome } from '@expo/vector-icons';  
import { useNavigation } from "@react-navigation/native";

const menuItems = [
  { id: "1", category: "Beverages", name: "Sweet Lassi", price: 89 },
  { id: "2", category: "Beverages", name: "Namkeen Lassi", price: 69 },
  { id: "3", category: "Mini Meal", name: "Dal Makhani + 1 Lachha + 1 Baby Naan", price: 129 },
  { id: "4", category: "Rice Combo", name: "Dal Makhani + Rice", price: 119 },
  { id: "5", category: "Thali", name: "Normal Thali", price: 129 },
  { id: "6", category: "Thali", name: "Veg Thali", price: 149 },
  { id: "7", category: "Shakes", name: "Strawberry Shake", price: 89 },
  { id: "8", category: "Morning Special", name: "Chole Bhature", price: 89 },
];

const MenuScreen = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const navigation = useNavigation(); // Ensure navigation is defined

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    setTotal(total + item.price);
  };

  const removeFromCart = (id) => {
    const itemToRemove = cart.find((cartItem) => cartItem.id === id);
    if (!itemToRemove) return;

    const updatedCart = cart.map((cartItem) =>
      cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    ).filter(cartItem => cartItem.quantity > 0);
    setCart(updatedCart);
    setTotal(total - itemToRemove.price);
  };

  const confirmOrder = () => {
    if (cart.length === 0) {
      Alert.alert("Cart is empty", "Please add items before confirming the order.");
      return;
    }
    setOrderConfirmed(true);
  };

  const printReceipt = () => {
    if (cart.length === 0) {
      Alert.alert("Cart is empty", "Please add items before printing the receipt.");
      return;
    }
    navigation.navigate("EmailSendReceipt", { cart, total });
  };

  return (
    <View style={styles.container}>
      {orderConfirmed ? (
        <View style={styles.confirmationContainer}>
          <Text style={styles.tickMark}>✔</Text>
          <Text style={styles.confirmationText}>Order Confirmed!</Text>
          <Text style={styles.orderDetails}>Your order:</Text>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Text style={styles.orderItem}>
                {item.name} X {item.quantity} - ₹{item.price * item.quantity}
              </Text>
            )}
          />
          <Text style={styles.total}>Total: ₹{total}</Text>

          {/* Print Receipt Button (Fixed) */}
          <TouchableOpacity style={styles.printButton} onPress={printReceipt}>
            <Text style={styles.printButtonText}>Print Receipt</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Text style={styles.heading}>Menu</Text>
          <FlatList
            data={menuItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.menuItem} onPress={() => addToCart(item)}>
                <View style={styles.menuCard}>
                  <Text style={styles.menuName}>{item.name}</Text>
                  <Text style={styles.menuPrice}>₹{item.price}</Text>
                </View>
                <FontAwesome name="plus-circle" size={30} color="#4CAF50" />
              </TouchableOpacity>
            )}
          />

          <View style={styles.cartContainer}>
            <Text style={styles.cartHeading}>Cart</Text>
            {cart.length === 0 ? (
              <Text style={styles.emptyCart}>Your cart is empty</Text>
            ) : (
              <>
                <FlatList
                  data={cart}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                      <Text style={styles.cartText}>
                        {item.name} X {item.quantity} - ₹{item.price * item.quantity}
                      </Text>
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => removeFromCart(item.id)}
                      >
                        <FontAwesome name="minus-circle" size={24} color="white" />
                      </TouchableOpacity>
                    </View>
                  )}
                />
                <Text style={styles.total}>Total: ₹{total}</Text>
                <TouchableOpacity style={styles.confirmButton} onPress={confirmOrder}>
                  <Text style={styles.confirmButtonText}>Confirm Order</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f4f4f4" },
  heading: { fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  tickMark: { fontSize: 50, color: "green", textAlign: "center", marginBottom: 10 },
  confirmationText: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  menuItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuCard: { flexDirection: "column", alignItems: "flex-start" },
  menuName: { fontSize: 18, fontWeight: "bold" },
  menuPrice: { fontSize: 16, color: "green" },
  cartContainer: { marginTop: 20, padding: 10, backgroundColor: "#fff", borderRadius: 10 },
  cartItem: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10 },
  removeButton: { backgroundColor: "#d32f2f", padding: 5, borderRadius: 5 },
  confirmButton: { backgroundColor: "#2e7d32", padding: 15, borderRadius: 10, marginTop: 10 },
  confirmButtonText: { color: "white", textAlign: "center", fontWeight: "bold", fontSize: 16 },
  total: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginTop: 10 },
  printButton: { backgroundColor: "#1976D2", padding: 15, borderRadius: 10, marginTop: 10 },
  printButtonText: { color: "white", fontWeight: "bold", textAlign: "center", fontSize: 16 },
  confirmationContainer: { alignItems: "center", paddingTop: 50 },
});

export default MenuScreen;
