import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Map styles
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    zIndex: 9999,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  locateButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "black",
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    elevation: 5,
  },
  locateIcon: {
    textAlign: "center",
  },

  // Modal styles
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    height: "50%",
  },
  modalScrollContent: {
    flexGrow: 1,
    paddingVertical: 10,
    justifyContent: "flex-start",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  noteInput: {
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingVertical: 10,
  },
  titleInput: {
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
  },

  // View Modal styles
  viewModalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    height: "70%",
  },
  viewModalScrollContent: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  viewModalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  souvenirImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  souvenirNote: {
    fontSize: 16,
    marginBottom: 10,
  },
  souvenirDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },

  // Navigation styles
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  navigationButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  multipleIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 10,
  },
  multipleText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  navButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  navButtonSmall: {
    padding: 6,
    borderRadius: 15,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },

  // Button styles
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
  },
  photoButton: {
    marginTop: 20,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  photoButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  addButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  editButton: {
    flex: 1,
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  viewCloseButton: {
    flex: 1,
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default styles; 
