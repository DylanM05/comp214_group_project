-- create a procedure to add new product to the bb_product table
CREATE OR REPLACE PROCEDURE prod_add_sp (
    p_productName IN VARCHAR2,
    p_description IN VARCHAR2,
    p_productImage IN VARCHAR2,
    p_price IN NUMBER,
    p_active IN NUMBER
    )
IS
BEGIN
--insert statement to add new product into the bb_product table
    INSERT INTO bb_product (productName, description, productImage, price, active)
    VALUES (p_productName, p_description, p_productImage, p_price, p_active);
    COMMIT;
    --print message to show new product has been added successfully
    DBMS_OUTPUT.PUT_LINE('Product added successfully.');
EXCEPTION
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('There was an error adding the new product. Please try again.');
END;
/
