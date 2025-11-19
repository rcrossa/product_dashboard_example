'use client';

import { useState } from 'react';
import { useProducts, useDeleteProduct, useDeleteProducts } from '@/presentation/hooks/use-products';
import { Product } from '@/domain/entities/product.entity';
import { ProductForm } from '@/presentation/components/products/product-form';
import { DeleteDialog } from '@/presentation/components/products/delete-dialog';

export function ProductTable() {
  const { data: products, isLoading, error } = useProducts();
  const deleteProduct = useDeleteProduct();
  const deleteProducts = useDeleteProducts();

  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [isDeleteGroupOpen, setIsDeleteGroupOpen] = useState(false);

  const toggleProductSelection = (id: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedProducts(newSelected);
  };

  const toggleSelectAll = () => {
    if (products && selectedProducts.size === products.length) {
      setSelectedProducts(new Set());
    } else if (products) {
      setSelectedProducts(new Set(products.map((p) => p.id)));
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = (id: string) => {
    setDeletingProductId(id);
  };

  const confirmDelete = async () => {
    if (deletingProductId) {
      await deleteProduct.mutateAsync(deletingProductId);
      setDeletingProductId(null);
    }
  };

  const handleDeleteGroup = () => {
    setIsDeleteGroupOpen(true);
  };

  const confirmDeleteGroup = async () => {
    if (selectedProducts.size > 0) {
      await deleteProducts.mutateAsync(Array.from(selectedProducts));
      setSelectedProducts(new Set());
      setIsDeleteGroupOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Cargando productos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">Error al cargar productos. Por favor intenta nuevamente.</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-linear-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-800">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Productos</h2>
          <div className="flex gap-3">
            {selectedProducts.size > 0 && (
              <button
                onClick={handleDeleteGroup}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Eliminar seleccionados ({selectedProducts.size})
              </button>
            )}
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-4 py-2 bg-blue-400 hover:bg-blue-600 text-white rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 font-medium"
            >
              + Agregar Producto
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={products && products.length > 0 && selectedProducts.size === products.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {products && products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    No hay productos. Agrega uno para comenzar.
                  </td>
                </tr>
              ) : (
                products?.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.has(product.id)}
                        onChange={() => toggleProductSelection(product.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {product.description ?? '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="px-3 py-1.5 bg-blue-400 hover:bg-blue-600 text-white rounded-md transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-3 py-1.5 bg-linear-to-r from-red-500 to-red-600 text-white rounded-md hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          onCloseAction={handleCloseForm}
        />
      )}

      {deletingProductId && (
        <DeleteDialog
          title="Eliminar producto"
          message="¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer."
          onConfirm={confirmDelete}
          onCancel={() => setDeletingProductId(null)}
          isDeleting={deleteProduct.isPending}
        />
      )}

      {isDeleteGroupOpen && (
        <DeleteDialog
          title="Eliminar productos seleccionados"
          message={`¿Estás seguro de que deseas eliminar ${selectedProducts.size} producto(s)? Esta acción no se puede deshacer.`}
          onConfirm={confirmDeleteGroup}
          onCancel={() => setIsDeleteGroupOpen(false)}
          isDeleting={deleteProducts.isPending}
        />
      )}
    </>
  );
}
