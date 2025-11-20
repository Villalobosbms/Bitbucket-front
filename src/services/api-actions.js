import api from './api.js'

export default{
    async getProductos(){
        try{
            const response = await api.get("/index");
            return response;
        }catch(error) {
            throw error.response?.data || error.message;
        }
    },

    async deleteProductos(id){
        try{
            const response = await api.delete(`/delete/${id}`);
            return response;
        }catch(error) {
            throw error.response?.data || error.message;
        }
    },

    async createProductos(nombre, descripcion){
        try {
            const response = await api.post('/store', { name: nombre, description:descripcion})
            return response
        } catch (error) {
            
        }
    },

    async updateProducto(id, nombre, descripcion){
        try{
            const response = await api.patch(`/update/${id}`, {name:nombre, description:descripcion});
            return response;
        }catch(error) {
            throw error.response?.data || error.message;
        }
    },
}