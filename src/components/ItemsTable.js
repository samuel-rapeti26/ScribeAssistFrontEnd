import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import TableRow from "./TableRow";

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

const ItemsTable = ({ data=[] }) =>{
console.log("data98",data);
 return (
  <View style={styles.tableContainer}>
    {/*<TableHeader />*/}
    <TableRow items={data} />
    {/*<TableFooter items={data.items} />*/}
  </View>
);
 }

export default ItemsTable;