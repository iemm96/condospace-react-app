export const options = (records) => {

    return {
        custom: true,
        paginationSize: 4,
        pageStartIndex: 1,
        firstPageText: 'Inicio',
        prePageText: 'Atrás',
        nextPageText: 'Siguiente',
        lastPageText: 'Final',
        nextPageTitle: 'Primer página',
        prePageTitle: 'Página anterior',
        firstPageTitle: 'Página siguiente',
        lastPageTitle: 'Última página',
        showTotal: true,
        totalSize: records.length
    }

};