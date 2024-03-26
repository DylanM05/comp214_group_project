--------------------------------------------------------------------------------
-- Calculate tax
CREATE OR REPLACE FUNCTION tax_cost_sp (
    state_code          bb_tax.state%TYPE,
    subtotal            NUMBER
)
RETURN NUMBER IS
    sv_tax_amt          NUMBER(7,2);
    sv_tax_rate         NUMBER;
BEGIN
    
    SELECT bt.taxrate INTO sv_tax_rate 
    FROM bb_tax bt
    WHERE bt.state = UPPER(state_code);    
    sv_tax_amt := sv_tax_rate * subtotal;
    RETURN sv_tax_amt;
    
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            sv_tax_amt := 0;        
        RETURN sv_tax_amt;

END tax_cost_sp;
--------------------------------------------------------------------------------
-- Testing
SELECT tax_cost_sp('va', 100) FROM dual;
SELECT tax_cost_sp('PU', 100) FROM dual;
--------------------------------------------------------------------------------
--------------------------------------------------------------------------------
-- Identify items on sale
CREATE OR REPLACE FUNCTION ck_sale_sf (
    p_date          VARCHAR2,
    p_product_id    bb_product.idproduct%TYPE
)
RETURN VARCHAR2 IS
    sv_sale_or_not     VARCHAR2(15);
    sv_date         DATE            := TO_DATE(p_date,'YYYY-MM-DD');
BEGIN
    SELECT CASE
        WHEN sv_date BETWEEN salestart AND saleend 
            THEN 'SALE!'
            ELSE 'GREAT DEAL'
        END
        INTO sv_sale_or_not
    FROM bb_product
    WHERE idproduct = p_product_id;
    RETURN sv_sale_or_not;
END;
--------------------------------------------------------------------------------
-- Testing
SELECT ck_sale_sf('2020-05-03',1) FROM dual;
SELECT ck_sale_sf('2012-06-08',6) FROM dual;
SELECT ck_sale_sf(TO_DATE('2020-05-03', 'YYYY-MM-DD'), 1) FROM dual;

--------------------------------------------------------------------------------
-- Helpers
SELECT * FROM bb_tax;
DESCRIBE bb_tax;

SELECT * FROM bb_product;
DESCRIBE bb_product;
--------------------------------------------------------------------------------
-- Rough
SELECT bt.taxrate 
FROM bb_tax bt
WHERE bt.state = 'VA';


    
