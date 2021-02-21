/**
 * @class Triangle
 * @description A class made to hold the properties of a triangle
 */
class Triangle {
    /**
     * @constructor
     * @description Constructor of a Triangle object
     * @param {Number} base
     * @param {Number} height
     */
    constructor(base, height) {
        this.base = base;
        this.height = height;
    }

    /**
     * @method area
     * @description Calclulates the area of the Triangle
     * @returns {Number} The area of the Triangle
     */
    area() {
        return (this.base * this.height) / 2;
    }

    /**
     * @method perimeter
     * @description Calculates the perimeter of a Triangle
     * @param {Number} side1
     * @param {Number} side2
     * @param {Number} side3
     * @returns {Number} The perimeter of the Triangle
     */
    perimeter(side1, side2, side3) {
        return side1 + side2 + side3;
    }
}
